import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { BUCKET, S3 } from "./client";

export async function uploadPhotoToR2(twitterImageUrl: string, tweetUrl: string) {
  const id = twitterImageUrl.replace("https://pbs.twimg.com/media/", "");
  const res = await fetch(twitterImageUrl);
  if (!res.ok) throw new Error(`Failed to download photo for id=${id} (${tweetUrl})`);

  const arrayBuffer = await res.arrayBuffer();
  const metadata = res.headers.get("content-type");
  const buffer = Buffer.from(arrayBuffer);

  const result = await S3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: `irasuto/${id}`,
      Body: buffer,
      ContentType: metadata ?? undefined,
    }),
  );

  if (Number(result.$metadata.httpStatusCode) >= 400)
    throw new Error(`Failed to upload photo for id=${id} (${tweetUrl})`);

  return id;
}

export async function removePhotoFromR2(storageKey: string) {
  // The following doesn't work on the edge runtime
  // https://github.com/aws/aws-sdk-js-v3/issues/4765
  // const result = await S3.send(
  //   new DeleteObjectCommand({ Bucket: BUCKET, Key: `irasuto/${storageKey}` }),
  // );
  const url = await getSignedUrl(
    S3,
    new DeleteObjectCommand({ Bucket: BUCKET, Key: `irasuto/${storageKey}` }),
    { expiresIn: 60 },
  );
  const result = await fetch(url, { method: "DELETE" });

  if (!result.ok) throw new Error(`Failed to remove photo for id=${storageKey}`);
}
