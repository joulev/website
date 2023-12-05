"use server";

import { init } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getHighlighter, toShikiTheme } from "shikiji";
import * as v from "valibot";

import { env } from "~/env.mjs";
import { db } from "~/lib/db";
import { codeSnippets } from "~/lib/db/schema";

async function slugExists(slug: string) {
  const entries = await db.select().from(codeSnippets).where(eq(codeSnippets.slug, slug)).limit(1);
  return entries.length > 0;
}

function processCode(code: string) {
  // remove preceding and trailing newlines, then add a trailing newline
  return `${code.replace(/^\n+|\n+$/g, "")}\n`;
}

async function highlightCode(code: string, language: string) {
  const themeJson: unknown = await fetch(env.EDITOR_THEME_URL).then(r => r.json());
  const theme = toShikiTheme(themeJson as Parameters<typeof toShikiTheme>[0]);
  const highlighter = await getHighlighter({ themes: [theme], langs: [language] });
  return highlighter.codeToHtml(code, { theme: theme.name, lang: language });
}

async function getAvailableSlug() {
  const generate = init({ length: 12 });
  let slug = generate();
  // eslint-disable-next-line no-await-in-loop -- Iterations are not independent
  while (await slugExists(slug)) slug = generate();
  return slug;
}

export async function createSnippet(formData: FormData) {
  const createSnippetSchema = v.object({
    code: v.string([v.maxLength(65_536)]),
    language: v.string([v.maxLength(16)]),
  });
  const { code, language } = v.parse(createSnippetSchema, {
    code: formData.get("code") || "",
    language: formData.get("language") || "plaintext",
  });
  const processedCode = processCode(code);
  const [slug, shikiOutput] = await Promise.all([
    getAvailableSlug(),
    highlightCode(processedCode, language),
  ]);
  await db.insert(codeSnippets).values({ slug, code: processedCode, language, shikiOutput });
  redirect(`/p/${slug}`);
}
