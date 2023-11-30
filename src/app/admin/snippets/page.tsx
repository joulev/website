"use client";

import { useEffect, useState } from "react";
import {
  type Highlighter,
  type IShikiTheme,
  type Lang,
  getHighlighter,
  setCDN,
  toShikiTheme,
} from "shiki";

import { Title } from "~/components/title";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface Shiki {
  highlighter: Highlighter;
  theme: IShikiTheme;
}

setCDN("/vendored/shiki/");

const preloadedLanguages: Lang[] = ["tsx", "css", "html", "json"];

function LoadingScreen({ children }: { children: React.ReactNode }) {
  return <div className="grid h-18 place-items-center text-sm text-text-secondary">{children}</div>;
}

function Editor({
  shiki,
  language,
  value,
  onChange,
}: {
  shiki: Shiki | Error | null;
  language: Lang;
  value: string;
  onChange: (value: string) => void;
}) {
  if (!shiki) return <LoadingScreen>Loading shiki&hellip;</LoadingScreen>;
  if (shiki instanceof Error) return <LoadingScreen>Failed to load shiki.</LoadingScreen>;
  return (
    <div className="flex flex-row bg-[--bg] font-mono" style={{ "--bg": shiki.theme.bg }}>
      <div className="flex w-8 flex-col items-end py-6 text-text-tertiary">
        {value.split("\n").map((_, i) => (
          <span key={i}>{i + 1}</span>
        ))}
      </div>
      <div className="flex-grow overflow-x-auto">
        <div className="relative w-fit min-w-full">
          <div
            dangerouslySetInnerHTML={{
              __html: shiki.highlighter.codeToHtml(`${value}\n`, {
                lang: language,
                theme: shiki.theme.name,
              }),
            }}
            className="[&_pre]:p-6"
          />
          <textarea
            value={value}
            onChange={e => onChange(e.target.value)}
            className="absolute inset-0 resize-none bg-transparent p-6 text-transparent caret-text-primary focus:outline-none"
            spellCheck={false}
            autoCorrect="off"
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<Lang>("tsx");
  const [shiki, setShiki] = useState<Shiki | Error | null>(null);
  useEffect(() => {
    (async () => {
      const themeJson: unknown = await fetch("/admin/snippets/get-theme").then(r => r.json());
      const theme = toShikiTheme(themeJson as Parameters<typeof toShikiTheme>[0]);
      const highlighter = await getHighlighter({ theme, langs: preloadedLanguages });
      setShiki({ highlighter, theme });
    })().catch(() => setShiki(new Error()));
  }, []);
  return (
    <main className="container max-w-screen-md">
      <Card className="flex flex-col p-0">
        <div className="bg-bg-darker py-6">
          <div className="container flex max-w-screen-md flex-col gap-6">
            <Title title="snippets" subtitle="Upload short code snippets here." />
          </div>
        </div>
        <div className="flex flex-col">
          <Editor shiki={shiki} language={language} value={code} onChange={setCode} />
          <div className="flex flex-col gap-3 p-6 sm:flex-row sm:justify-between">
            <div>
              <Select value={language} onValueChange={val => setLanguage(val as Lang)}>
                <SelectTrigger className="w-full sm:w-64">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {/* <SelectLabel>Preloaded</SelectLabel> */}
                    <SelectItem value="tsx">TypeScript JSX</SelectItem>
                    <SelectItem value="css">CSS</SelectItem>
                    <SelectItem value="html">HTML</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                  </SelectGroup>
                  {/* <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Others (none for now)</SelectLabel>
                  </SelectGroup> */}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-row">
              <Button className="w-full sm:w-auto" onClick={() => setCode("")}>
                Clear
              </Button>
              <Button className="w-full sm:w-auto" variants={{ variant: "primary" }}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </main>
  );
}
