import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Code, Link, Plus, Share, Text } from "~/components/icons";
import { Button, LinkButton } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";

import type { PageProps, Params } from "./$types";
import { DropdownMenuItemCopyButton } from "./dropdown-menu-item-copy-button";
import { getSnippet } from "./get-snippet";

export default async function Page({ params }: PageProps) {
  const snippet = await getSnippet((await params).slug);
  if (!snippet) notFound();
  return (
    <main className="container max-w-[100ch] py-18">
      <div className="card overflow-clip rounded-full bg-bg-darker backdrop-blur">
        <div className="flex flex-row items-center justify-between px-6 py-4 font-mono text-sm">
          <div className="flex flex-row items-center gap-6">
            <div className="flex flex-row gap-2">
              <div className="size-3 rounded-full bg-text-tertiary" />
              <div className="size-3 rounded-full bg-text-tertiary" />
              <div className="size-3 rounded-full bg-text-tertiary" />
            </div>
            <div className="flex cursor-default select-none flex-row text-text-secondary max-sm:hidden">
              <div className="mr-3 border-r border-separator pr-3">{snippet.slug}</div>
              <div>{snippet.language}</div>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variants={{ size: "sm" }}>
                  <Share />
                  Share
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-44 font-mono">
                <DropdownMenuItemCopyButton content={snippet.code} icon={<Code />}>
                  Copy code
                </DropdownMenuItemCopyButton>
                <DropdownMenuItemCopyButton
                  content={`https://joulev.dev/p/${snippet.slug}`}
                  icon={<Link />}
                >
                  Copy link
                </DropdownMenuItemCopyButton>
                <DropdownMenuItemCopyButton
                  content={`https://joulev.dev/p/${snippet.slug}/raw`}
                  icon={<Text />}
                >
                  Copy link raw
                </DropdownMenuItemCopyButton>
              </DropdownMenuContent>
            </DropdownMenu>
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
              dangerouslySetInnerHTML={{ __html: snippet.shikiOutput || "" }}
              className="inline-block min-w-full pr-6 text-sm selection:bg-bg-idle [&_pre]:!bg-transparent"
            />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </main>
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const snippet = await getSnippet((await params).slug);
  if (!snippet) return {};
  return {
    robots: { index: false, follow: false },
    title: `Code snippet ${snippet.slug}`,
    description: "A code snippet created on joulev.dev/apps/snippets",
  };
}

export const revalidate = 0;
export const runtime = "edge";
