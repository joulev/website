import { getSession } from "~/lib/auth/helpers";
import { getPresignedUrl } from "~/lib/s3/upload-files";

export async function POST() {
  await getSession();
  const data = await getPresignedUrl();
  return Response.json(data);
}

export const runtime = "edge";
