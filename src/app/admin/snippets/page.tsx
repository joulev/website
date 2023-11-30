"use client";

import { useEffect, useState } from "react";
import { type Highlighter, getHighlighter, setCDN, toShikiTheme } from "shiki";

import { Title } from "~/components/title";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";

interface Shiki {
  highlighter: Highlighter;
  theme: string;
}

setCDN("/vendored/shiki/");

function Editor({
  shiki,
  value,
  onChange,
}: {
  shiki: Shiki;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <div className="relative w-fit min-w-full text-sm">
        <div
          dangerouslySetInnerHTML={{
            __html: shiki.highlighter.codeToHtml(`${value}\n`, { lang: "tsx", theme: shiki.theme }),
          }}
          className="[&_pre]:p-6"
        />
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          className="absolute inset-0 resize-none bg-transparent p-6 font-mono text-transparent focus:outline-none"
          spellCheck={false}
          autoCorrect="off"
          autoComplete="off"
        />
      </div>
    </div>
  );
}

export default function Page() {
  const [code, setCode] = useState("");
  const [shiki, setShiki] = useState<Shiki | null>(null);
  useEffect(() => {
    void (async () => {
      const themeJson: unknown = await fetch("/admin/snippets/get-theme").then(r => r.json());
      const theme = toShikiTheme(themeJson as Parameters<typeof toShikiTheme>[0]);
      const highlighter = await getHighlighter({ theme });
      setShiki({ highlighter, theme: theme.name });
    })();
  }, []);
  return (
    <main className="container max-w-screen-sm">
      <Card className="flex flex-col p-0">
        <div className="bg-bg-darker py-6">
          <div className="container flex max-w-screen-md flex-col gap-6">
            <Title title="snippets" subtitle="Upload short code snippets here." />
          </div>
        </div>
        <div className="flex flex-col">
          {shiki ? (
            <Editor shiki={shiki} value={code} onChange={setCode} />
          ) : (
            <div className="grid h-[68px] place-items-center text-sm text-text-secondary">
              Loading shiki&hellip;
            </div>
          )}
          <div className="flex flex-row justify-end gap-3 p-6">
            <Button onClick={() => setCode("")}>Clear</Button>
            <Button variants={{ variant: "primary" }}>Save</Button>
          </div>
        </div>
      </Card>
    </main>
  );
}
