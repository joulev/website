import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

import { S3 } from "./client";

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
