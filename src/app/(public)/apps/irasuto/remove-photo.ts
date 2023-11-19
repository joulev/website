"use server";

import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

import { db } from "~/lib/db";
import { photos } from "~/lib/db/schema";
import { removePhotoFromR2 } from "~/lib/s3/irasuto";

export async function removePhoto(url: string) {
  throw new Error("This function is disabled in production.");
  await removePhotoFromR2(url);
  await db.delete(photos).where(eq(photos.url, url));
  revalidateTag("photos");
}
