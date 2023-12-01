"use server";

import { init } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { maxLength, object, parse, string } from "valibot";

import { db } from "~/lib/db";
import { codeSnippets } from "~/lib/db/schema";

const createSnippetSchema = object({
  code: string([maxLength(65_536)]),
  language: string([maxLength(16)]),
});

const generate = init({ length: 12 });

async function slugExists(slug: string) {
  const entries = await db.select().from(codeSnippets).where(eq(codeSnippets.slug, slug)).limit(1);
  return entries.length > 0;
}

export async function createSnippet(formData: FormData) {
  const { code, language } = parse(createSnippetSchema, {
    code: formData.get("code") || "",
    language: formData.get("language") || "plaintext",
  });
  let slug = generate();
  // eslint-disable-next-line no-await-in-loop -- Iterations are not independent
  while (await slugExists(slug)) slug = generate();
  await db.insert(codeSnippets).values({ slug, code, language });
  redirect(`https://p.joulev.dev/${slug}`);
}
