"use server";

import { init } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { parse } from "valibot";

import { db } from "~/lib/db";
import { shortLinks } from "~/lib/db/schema";

import { publicCreateSchema } from "./schemas";

const generate = init({ length: 6 });

async function slugExists(slug: string) {
  const entries = await db.select().from(shortLinks).where(eq(shortLinks.slug, slug)).limit(1);
  return entries.length > 0;
}

export async function publicCreateLink(formData: FormData) {
  const { slug: rawSlug, url } = parse(publicCreateSchema, {
    slug: formData.get("slug") || undefined,
    url: formData.get("url"),
  });
  let slug = rawSlug || generate();
  // eslint-disable-next-line no-await-in-loop -- Iterations are not independent
  while (await slugExists(slug)) slug = generate();
  await db.insert(shortLinks).values({ slug, url });
  redirect(`/apps/link/success?slug=${encodeURIComponent(slug)}`);
}
