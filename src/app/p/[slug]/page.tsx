import { eq } from "drizzle-orm";
import { Code, Link, Plus } from "lucide-react";
import type { Metadata } from "next";
import { unstable_cache as cache } from "next/cache";
import { notFound } from "next/navigation";
import { getWasmInlined, toShikiTheme } from "shikiji";
import { getHighlighterCore } from "shikiji/core";

import { CopyButton } from "~/components/copy-button";
import { LinkButton } from "~/components/ui/button";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { env } from "~/env.mjs";
import { db } from "~/lib/db";
import { codeSnippets } from "~/lib/db/schema";
import { supportedLanguages } from "~/lib/snippets/supported-languages";

import type { PageProps, Params } from "./$types";

const getSnippet = cache(async (slug: string) => {
  const results = await db.select().from(codeSnippets).where(eq(codeSnippets.slug, slug)).limit(1);
  return results.at(0);
});

const highlightCodeSnippet = cache(async (code: string, language: string) => {
  const themeJson: unknown = await fetch(env.EDITOR_THEME_URL).then(r => r.json());
  const theme = toShikiTheme(themeJson as Parameters<typeof toShikiTheme>[0]);
  const highlighter = await getHighlighterCore({
    themes: [theme],
    langs: supportedLanguages.map(lang => lang.grammar),
    loadWasm: getWasmInlined,
  });
  return highlighter.codeToHtml(code, { theme: theme.name, lang: language });
});

export default async function Page({ params }: PageProps) {
  const snippet = await getSnippet(params.slug);
  if (!snippet) notFound();
  const html = await highlightCodeSnippet(snippet.code, snippet.language);
  return (
    <main className="container max-w-[100ch] py-18">
      <div className="card overflow-clip rounded-full bg-bg-darker backdrop-blur">
        <div className="flex flex-row items-center justify-between px-6 py-4 font-mono text-sm">
          <div className="flex flex-row items-center gap-6">
            <div className="flex flex-row gap-2">
              <div className="h-3 w-3 rounded-full bg-text-tertiary" />
              <div className="h-3 w-3 rounded-full bg-text-tertiary" />
              <div className="h-3 w-3 rounded-full bg-text-tertiary" />
            </div>
            <div className="flex cursor-default select-none flex-row text-text-secondary max-sm:hidden">
              <div className="mr-3 border-r border-separator pr-3">{snippet.slug}</div>
              <div>{snippet.language}</div>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <CopyButton
              className="[--button-gap:0.5rem] max-md:hidden"
              content={snippet.code}
              variants={{ size: "sm" }}
              copyChildren={
                <>
                  <Code /> Copy code
                </>
              }
            />
            <CopyButton
              className="[--button-gap:0.5rem]"
              content={`https://joulev.dev/p/${snippet.slug}`}
              variants={{ size: "sm" }}
              copyChildren={
                <>
                  <Link /> Copy link
                </>
              }
            />
            <LinkButton
              className="[--button-gap:0.5rem]"
              href="https://joulev.dev/apps/snippets"
              variants={{ variant: "primary", size: "sm" }}
            >
              <Plus /> New
            </LinkButton>
          </div>
        </div>
        <div className="flex w-full flex-row gap-6">
          <div className="shrink-0 cursor-default select-none pb-6 pl-6">
            <div className="flex flex-col items-end gap-1 py-0.5 font-mono text-sm">
              {snippet.code.split("\n").map((_, i) => (
                <div key={i} className="leading-4 text-text-tertiary">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
          <ScrollArea className="flex-grow overflow-x-auto pb-6">
            <div
              dangerouslySetInnerHTML={{ __html: html }}
              className="inline-block min-w-full pr-6 text-sm selection:bg-bg-idle [&_pre]:!bg-transparent"
            />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </main>
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const snippet = await getSnippet(params.slug);
  if (!snippet) return {};
  return {
    robots: { index: false, follow: false },
    title: `Code snippet ${snippet.slug}`,
    description: "A code snippet created on joulev.dev/apps/snippets",
  };
}

export const revalidate = 0;
