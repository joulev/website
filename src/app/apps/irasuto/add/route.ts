import { EmbedBuilder } from "@discordjs/builders";
import type { RESTPostAPIWebhookWithTokenJSONBody } from "discord-api-types/v10";
import { sql } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { getTweet } from "react-tweet/api";
import { z } from "zod";

import { env } from "~/env.mjs";
import { db } from "~/lib/db";
import { photos as photosSchema } from "~/lib/db/schema";
import type { NewIrasutoPhoto } from "~/lib/db/schema";

import { uploadPhotoToR2 } from "../s3";

const schema = z.object({ password: z.literal(env.PASSWORD), url: z.string().url() });

async function getPhotos(id: string): Promise<NewIrasutoPhoto[] | null> {
  const tweet = await getTweet(id);
  if (!tweet?.photos) return null;
  return tweet.photos.map(photo => ({
    url: photo.url,
    width: photo.width,
    height: photo.height,
    tweetUrl: `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`,
    authorName: tweet.user.name,
    authorHandle: tweet.user.screen_name,
    date: new Date(tweet.created_at),
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
            name: "Source",
            value: `[Click here](<${photo.tweetUrl}>)`,
            inline: true,
          },
          {
            name: "Posted",
            value: `<t:${Math.round((photo.date ?? new Date()).valueOf() / 1000)}:R>`,
            inline: true,
          },
        ])
        .setImage(photo.url)
        .setFooter({ text: `Total: ${totalCount}` })
        .setColor(0x8ec8f6)
        .toJSON(),
    ],
  };
}

export async function POST(request: Request) {
  const e = (msg: string) => new Error(msg);
  try {
    const url = new URL(schema.parse(await request.json()).url);
    if (url.hostname !== "twitter.com" && url.hostname !== "x.com")
      throw e(`Invalid hostname: ${url.hostname}`);

    if (url.hostname === "x.com") url.hostname = "twitter.com";

    const id = url.pathname.split("/").at(-1);
    if (!id) throw e(`Invalid pathname: ${url.pathname}`);

    const photos = await getPhotos(id);
    if (!photos) throw e(`No photos found for id=${id} (${url.href})`);

    await Promise.all(
      photos.map(async photo => {
        const fileName = await uploadPhotoToR2(photo.url, photo.tweetUrl);
        photo.url = `https://r2.irasuto.joulev.dev/irasuto/${fileName}`;

        // We don't parallelise this because we don't want to have db items without photos
        await db.insert(photosSchema).values(photo);

        if (env.DISCORD_WEBHOOK) {
          // This may be incorrect due to race conditions, but it's good enough
          const query = await db.select({ count: sql<number>`COUNT(*)` }).from(photosSchema);
          await fetch(env.DISCORD_WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(buildEmbedFromPhoto(photo, query[0].count)),
          });
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
