import { EmbedBuilder } from "@discordjs/builders";
import type { RESTPostAPIWebhookWithTokenJSONBody } from "discord-api-types/v10";
import { sql } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { getTweet } from "react-tweet/api";
import * as v from "valibot";

import { env } from "~/env.mjs";
import { db } from "~/lib/db";
import type { NewIrasutoPhoto } from "~/lib/db/schema";
import { photos as photosSchema } from "~/lib/db/schema";
import { uploadPhotoToR2 } from "~/lib/s3/irasuto";

const schema = v.object({ password: v.literal(env.PASSWORD), url: v.pipe(v.string(), v.url()) });

type FetchedPhoto = Omit<NewIrasutoPhoto, "storageKey"> & { url: string };

async function getPhotos(id: string): Promise<FetchedPhoto[] | null> {
  const tweet = await getTweet(id);
  if (!tweet?.photos) return null;
  return tweet.photos.map(photo => ({
    url: photo.url,
    width: photo.width,
    height: photo.height,
    tweetUrl: `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`,
    authorName: tweet.user.name,
    authorHandle: tweet.user.screen_name,
    date: new Date(), // date that it is added to the db, not the posted date
  }));
}

function buildEmbedFromPhoto(
  photo: NewIrasutoPhoto,
  totalCount: number,
): RESTPostAPIWebhookWithTokenJSONBody {
  return {
    embeds: [
      new EmbedBuilder()
        .setURL(photo.tweetUrl)
        .setFields([
          {
            name: "Author",
            value: `[@${photo.authorHandle}](<https://twitter.com/${photo.authorHandle}>)`,
            inline: true,
          },
          {
            name: "Tweet",
            value: `[Click here](<${photo.tweetUrl}>)`,
            inline: true,
          },
        ])
        .setImage(`https://r2.joulev.dev/irasuto/${photo.storageKey}`)
        .setFooter({ text: `Total: ${totalCount}` })
        .setColor(0x8ec8f6)
        .toJSON(),
    ],
  };
}

export async function POST(request: Request) {
  const e = (msg: string) => new Error(msg);
  try {
    const url = new URL(v.parse(schema, await request.json()).url);
    if (url.hostname !== "twitter.com" && url.hostname !== "x.com")
      throw e(`Invalid hostname: ${url.hostname}`);

    if (url.hostname === "x.com") url.hostname = "twitter.com";

    const id = url.pathname.split("/").at(-1);
    if (!id) throw e(`Invalid pathname: ${url.pathname}`);

    const photos = await getPhotos(id);
    if (!photos) throw e(`No photos found for id=${id} (${url.href})`);

    await Promise.all(
      photos.map(async photo => {
        const { url: _, ...rest } = photo;

        const key = await uploadPhotoToR2(photo.url, photo.tweetUrl);

        const newIrasutoPhoto: NewIrasutoPhoto = { ...rest, storageKey: key };

        // We don't parallelise this because we don't want to have db items without photos
        await db.insert(photosSchema).values(newIrasutoPhoto);

        if (env.DISCORD_WEBHOOKS) {
          // This may be incorrect due to race conditions, but it's good enough
          const query = await db.select({ count: sql<number>`COUNT(*)` }).from(photosSchema);
          const webhookRequestInit: RequestInit = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(buildEmbedFromPhoto(newIrasutoPhoto, query[0].count)),
          };
          await Promise.all(env.DISCORD_WEBHOOKS.map(u => fetch(u, webhookRequestInit)));
        }
      }),
    );

    revalidateTag("photos");

    return new Response("Ok!");
  } catch (error) {
    console.error(error);
    return new Response("Invalid request", { status: 400 });
  }
}

export const runtime = "edge";
