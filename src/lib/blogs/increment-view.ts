"use server";

import { sql } from "drizzle-orm";

import { db } from "~/lib/db";
import { blogPosts } from "~/lib/db/schema";

export async function incrementViews(slug: string) {
  if (process.env.NODE_ENV === "development") return;
  await db
    .insert(blogPosts)
    .values({ slug, viewCount: 1 })
    .onConflictDoUpdate({
      target: blogPosts.slug,
      set: { viewCount: sql`${blogPosts.viewCount} + 1` },
    });
}
