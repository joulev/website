import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getTweet as _getTweet } from "react-tweet/api";

import { env } from "~/env.mjs";

const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: env.R2_ACCESS_KEY, secretAccessKey: env.R2_SECRET_ACCESS_KEY },
});

export async function uploadPhotoToR2(twitterImageUrl: string, tweetUrl: string) {
  const id = twitterImageUrl.replace("https://pbs.twimg.com/media/", "");
  const res = await fetch(twitterImageUrl);
  if (!res.ok) throw new Error(`Failed to download photo for id=${id} (${tweetUrl})`);

  const arrayBuffer = await res.arrayBuffer();
  const metadata = res.headers.get("content-type");
  const buffer = Buffer.from(arrayBuffer);

  const result = await S3.send(
    new PutObjectCommand({
      Bucket: "webapps-irasuto",
      Key: `irasuto/${id}`,
      Body: buffer,
      ContentType: metadata ?? undefined,
    }),
  );
  if (Number(result.$metadata.httpStatusCode) >= 400)
    throw new Error(`Failed to upload photo for id=${id} (${tweetUrl})`);

  return id;
}

export async function removePhotoFromR2(r2ImageUrl: string) {
  const id = r2ImageUrl.replace("https://r2.irasuto.joulev.dev/irasuto/", "");
  const result = await S3.send(
    new DeleteObjectCommand({ Bucket: "webapps-irasuto", Key: `irasuto/${id}` }),
  );
  if (Number(result.$metadata.httpStatusCode) >= 400)
    throw new Error(`Failed to remove photo for id=${id} (${r2ImageUrl})`);

  return id;
}
