"use server";

import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";

import { getSession } from "~/lib/auth/helpers";
import { db } from "~/lib/db";
import { photos } from "~/lib/db/schema";
import { removePhotoFromR2 } from "~/lib/s3/irasuto";

export async function removePhoto(storageKey: string) {
  await getSession();
  await removePhotoFromR2(storageKey);
  await db.delete(photos).where(eq(photos.storageKey, storageKey));
  updateTag("photos");
}
