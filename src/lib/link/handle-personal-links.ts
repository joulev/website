"use server";

import { and, eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

import { getSession } from "~/lib/auth/helpers";
import { db } from "~/lib/db";
import { type NewShortLink, shortLinks } from "~/lib/db/schema";

export async function upsertPersonalLink(id: number | null, data: NewShortLink) {
  await getSession();

  if (id === null) await db.insert(shortLinks).values({ ...data, isJoulev: true });
  else
    await db
      .update(shortLinks)
      .set({ ...data, updated: new Date() })
      .where(and(eq(shortLinks.id, id), eq(shortLinks.isJoulev, true)));

  revalidateTag("joulev-links");
}

export async function deletePersonalLink(id: number) {
  await getSession();
  await db.delete(shortLinks).where(and(eq(shortLinks.id, id), eq(shortLinks.isJoulev, true)));
  revalidateTag("joulev-links");
}
