import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createId } from "@paralleldrive/cuid2";

import { BUCKET, S3 } from "./client";

export async function getPresignedUrl() {
  const randomCuid = createId();
  const key = `files/${randomCuid}`;

  const command = new PutObjectCommand({ Bucket: BUCKET, Key: key });
  const url = await getSignedUrl(S3, command, { expiresIn: 60 });
  return { url, key };
}
