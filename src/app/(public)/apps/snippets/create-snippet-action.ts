"use server";

import { init } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import * as v from "valibot";

import themeJson from "~/../.theme/theme.json";
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
  const { normalizeTheme, getHighlighter } = await import("shiki");
  const theme = normalizeTheme(themeJson as unknown as import("shiki").ThemeRegistrationAny);
  const highlighter = await getHighlighter({ themes: [theme], langs: [language] });
  return highlighter.codeToHtml(code, { theme: theme.name, lang: language });
}

async function getAvailableSlug() {
  const generate = init({ length: 12 });
  let slug = generate();
  while (await slugExists(slug)) slug = generate();
  return slug;
}

export async function createSnippet(formData: FormData) {
  const createSnippetSchema = v.object({
    code: v.pipe(v.string(), v.maxLength(65_536)),
    language: v.pipe(v.string(), v.maxLength(16)),
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
