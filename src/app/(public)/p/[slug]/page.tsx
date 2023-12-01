import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import { db } from "~/lib/db";
import { codeSnippets } from "~/lib/db/schema";

import type { PageProps } from "./$types";

async function getSnippet(slug: string) {
  const results = await db.select().from(codeSnippets).where(eq(codeSnippets.slug, slug)).limit(1);
  return results.at(0);
}

export default async function Page({ params }: PageProps) {
  const snippet = await getSnippet(params.slug);
  if (!snippet) notFound();
  return (
    <div>
      <pre>{snippet.code}</pre>
    </div>
  );
}

export const runtime = "edge";
export const revalidate = 0;
