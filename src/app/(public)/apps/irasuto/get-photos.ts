import { desc } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";

import { db } from "~/lib/db";
import { photos } from "~/lib/db/schema";

import type { Photo } from "./types";

export const getPhotos = cache(
  async (): Promise<Photo[]> => db.select().from(photos).orderBy(desc(photos.date)),
  [],
  { tags: ["photos"], revalidate: 86400 }, // 1 day
);
