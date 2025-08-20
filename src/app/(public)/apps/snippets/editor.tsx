"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  bundledLanguages,
  createHighlighter,
  type Highlighter,
  normalizeTheme,
  type ThemeRegistrationAny,
  type ThemeRegistrationResolved,
} from "shiki";

import themeJson from "~/../.theme/theme.json";
import { Save } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { createSnippet } from "./create-snippet-action";

interface ShikiEditorProps {
  name: string;
  language: string;
  tabSize?: number;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

interface Shiki {
  highlighter: Highlighter;
  theme: ThemeRegistrationResolved;
}

const preloadedLanguages = ["tsx", "css", "html", "json"];

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

function ShikiEditor({ name, language, tabSize = 2, value, onChange }: ShikiEditorProps) {
  const [shiki, setShiki] = useState<Shiki | Error | null>(null);
  const [loadedLanguages, setLoadedLanguages] = useState<string[]>(preloadedLanguages);
  const [displayedLanguage, setDisplayedLanguage] = useState(language);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (!textareaRef.current) return;
      const [start, end] = [e.currentTarget.selectionStart, e.currentTarget.selectionEnd];
      const curValue = e.currentTarget.value;
      if (e.key === "Tab") {
        e.preventDefault();
        onChange(`${curValue.substring(0, start)}${" ".repeat(tabSize)}${curValue.substring(end)}`);
        await delay(1); // without this artificial delay, the cursor won't be set correctly
        textareaRef.current.selectionStart = start + tabSize;
        textareaRef.current.selectionEnd = start + tabSize;
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        const lines = curValue.substring(0, start).split("\n");
        const indent = /^\s*/.exec(lines[lines.length - 1])?.[0] ?? "";
        onChange(`${curValue.substring(0, start)}\n${indent}${curValue.substring(end)}`);
        await delay(1); // without this artificial delay, the cursor won't be set correctly
        textareaRef.current.selectionStart = start + indent.length + 1;
        textareaRef.current.selectionEnd = start + indent.length + 1;
      }

      if (e.key === "Backspace") {
        if (start !== end) return; // selection. fallback to default behavior
        const line = curValue.substring(0, start).split("\n").pop();
        if (!line) return; // empty ("") before cursor, fallback to default behavior
        if (line.trim() !== "") return; // not empty before cursor, fallback to default behavior

        e.preventDefault();
        onChange(`${curValue.substring(0, start - tabSize)}${curValue.substring(end)}`);
        await delay(1); // without this artificial delay, the cursor won't be set correctly
        textareaRef.current.selectionStart = start - tabSize;
        textareaRef.current.selectionEnd = start - tabSize;
      }
    },
    [onChange, tabSize],
  );

  // Load Shiki
  useEffect(() => {
    (async () => {
      const resolvedTheme = normalizeTheme(themeJson as unknown as ThemeRegistrationAny);
      const highlighter = await createHighlighter({
        themes: [resolvedTheme],
        langs: preloadedLanguages,
      });
      setShiki({ highlighter, theme: resolvedTheme });
    })().catch(() => setShiki(new Error()));
  }, []);

  // Load languages that are not preloaded
  useEffect(() => {
    if (!shiki || shiki instanceof Error) return;
    if (loadedLanguages.includes(language)) {
      setDisplayedLanguage(language);
      return;
    }

    void (async () => {
      setDisplayedLanguage("plaintext");
      try {
        // @ts-expect-error -- It is a valid language, don't worry
        await shiki.highlighter.loadLanguage(language);
        setLoadedLanguages([...loadedLanguages, language]);
        setDisplayedLanguage(language);
      } catch {
        // Language is invalid, we just use plaintext
      }
    })();
  }, [language, loadedLanguages, shiki]);

  const shikiIsLoaded = shiki && !(shiki instanceof Error);
  return (
    <div className="flex flex-row font-mono text-sm">
      <ScrollArea className="flex-grow overflow-x-auto">
        <div className="relative w-fit min-w-full">
          {shikiIsLoaded ? (
            <div
              dangerouslySetInnerHTML={{
                __html: shiki.highlighter.codeToHtml(`${value}\n`, {
                  lang: displayedLanguage,
                  theme: shiki.theme.name,
                }),
              }}
              className="[&_pre]:!bg-transparent [&_pre]:p-6 [&_pre]:pl-[60px] [&_pre]:pt-4"
            />
          ) : (
            <div>
              <pre className="p-6 pl-[60px] pt-4 text-text-primary">
                <code>{`${value}\n`}</code>
              </pre>
            </div>
          )}
          <div className="absolute inset-y-0 left-0 flex w-9 flex-col items-end pb-6 pt-4 text-text-tertiary">
            {value.split("\n").map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>
          <textarea
            ref={textareaRef}
            name={name}
            value={value}
            onChange={e => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="absolute inset-0 h-full w-full resize-none bg-transparent p-6 pl-[60px] pt-4 text-transparent caret-text-primary selection:bg-bg-idle focus:outline-none"
            spellCheck={false}
            autoCorrect="off"
            autoComplete="off"
          />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      // The button is ever so slightly a bit shorter than the select (intentional), so we add self-center
      // to not make it higher than it should be
      className="self-center"
      variants={{ variant: "primary", size: "sm" }}
      disabled={pending}
    >
      <Save className="max-sm:hidden" /> Save
    </Button>
  );
}

const languages = Object.keys(bundledLanguages);

export function Editor() {
  const [code, setCode] = useState("");
  const [tabSize, setTabSize] = useState(2);
  const [language, setLanguage] = useState("tsx");
  return (
    <form
      action={createSnippet}
      className="card overflow-clip rounded-full bg-bg-darker backdrop-blur"
    >
      <div className="flex flex-row items-center justify-between px-6 pt-4 font-mono text-sm">
        <div className="flex flex-row gap-2">
          <div className="size-3 rounded-full bg-text-tertiary" />
          <div className="size-3 rounded-full bg-text-tertiary" />
          <div className="size-3 rounded-full bg-text-tertiary" />
        </div>
        <div className="flex flex-row gap-3">
          <Select name="language" value={language} onValueChange={setLanguage}>
            <SelectTrigger className="min-h-8 w-32 px-3 py-1 sm:w-40">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent className="max-h-56">
              <SelectGroup>
                <SelectLabel>Languages</SelectLabel>
                <SelectItem value="plaintext">Plain text</SelectItem>
                {languages.map(lang => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            value={tabSize.toString()}
            onValueChange={val => setTabSize(Number.parseInt(val))}
          >
            <SelectTrigger className="min-h-8 w-36 px-3 py-1 max-sm:hidden">
              <SelectValue placeholder="Select tabsize" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tab sizes</SelectLabel>
                <SelectItem value="2">Tab size: 2</SelectItem>
                <SelectItem value="4">Tab size: 4</SelectItem>
                <SelectItem value="8">Tab size: 8</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <SaveButton />
        </div>
      </div>
      <ShikiEditor
        name="code"
        language={language}
        tabSize={tabSize}
        value={code}
        onChange={setCode}
      />
    </form>
  );
}
