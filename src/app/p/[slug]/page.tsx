import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { type Lang, getHighlighter, toShikiTheme } from "shiki";

import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { env } from "~/env.mjs";
import { db } from "~/lib/db";
import { type CodeSnippet, codeSnippets } from "~/lib/db/schema";

import type { PageProps } from "./$types";

async function getSnippet(slug: string) {
  const results = await db.select().from(codeSnippets).where(eq(codeSnippets.slug, slug)).limit(1);
  return results.at(0);
}

async function highlightCodeSnippet(snippet: CodeSnippet) {
  const themeJson: unknown = await fetch(env.EDITOR_THEME_URL).then(r => r.json());
  const theme = toShikiTheme(themeJson as Parameters<typeof toShikiTheme>[0]);
  const highlighter = await getHighlighter({ theme, langs: [snippet.language as Lang] });
  return [
    theme,
    highlighter.codeToHtml(snippet.code, { theme: theme.name, lang: snippet.language }),
  ] as const;
}

export default async function Page({ params }: PageProps) {
  const snippet = await getSnippet(params.slug);
  if (!snippet) notFound();
  const [theme, html] = await highlightCodeSnippet(snippet);
  return (
    <main className="container max-w-screen-lg py-12">
      <div
        className="flex w-full flex-row gap-6 overflow-hidden rounded-full bg-[--bg]"
        style={{ "--bg": theme.bg }}
      >
        <div className="flex shrink-0 cursor-default select-none flex-col items-end py-6 pl-6 font-mono text-sm">
          {snippet.code.split("\n").map((_, i) => (
            <div key={i} className="text-text-tertiary">
              {i + 1}
            </div>
          ))}
        </div>
        <ScrollArea className="flex-grow overflow-x-auto py-6">
          <div
            dangerouslySetInnerHTML={{ __html: html }}
            className="inline-block text-sm selection:bg-bg-idle"
          />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </main>
  );
}

// TODO: Support the edge runtime by trying shikiji
// export const runtime = "edge";
export const revalidate = 0;
