import { eq } from "drizzle-orm";
import { unstable_cache as cache } from "next/cache";

import { db } from "~/lib/db";
import { codeSnippets } from "~/lib/db/schema";

export const getSnippet = cache(async (slug: string) => {
  const results = await db.select().from(codeSnippets).where(eq(codeSnippets.slug, slug)).limit(1);
  return results.at(0);
});
