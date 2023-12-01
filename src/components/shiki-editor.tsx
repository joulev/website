import { useCallback, useEffect, useRef, useState } from "react";
import {
  type Highlighter,
  type IShikiTheme,
  type Lang,
  type Theme,
  getHighlighter,
  setCDN,
  toShikiTheme,
} from "shiki";

interface ShikiEditorProps {
  name: string;
  /**
   * URL to the theme JSON, or one of the default theme
   */
  // eslint-disable-next-line @typescript-eslint/ban-types -- This is an IDE hack for autocompletion yet allowing all strings
  theme: Theme | (string & {});
  // eslint-disable-next-line @typescript-eslint/ban-types -- This is an IDE hack for autocompletion yet allowing all strings
  language: Lang | (string & {});
  tabSize?: number;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

interface Shiki {
  highlighter: Highlighter;
  theme: IShikiTheme | Theme;
}

setCDN("/vendored/shiki/");

const preloadedLanguages: Lang[] = ["tsx", "css", "html", "json"];

function LoadingScreen({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-[68px] place-items-center text-sm text-text-secondary">{children}</div>
  );
}

async function getShikiTheme(theme: string): Promise<IShikiTheme | Theme> {
  try {
    const url = new URL(theme, window.location.href);
    const themeJson: unknown = await fetch(url).then(r => r.json());
    return toShikiTheme(themeJson as Parameters<typeof toShikiTheme>[0]);
  } catch {
    // not an url, then should be a theme
    return theme as Theme;
  }
}

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export function ShikiEditor({
  name,
  theme,
  language,
  tabSize = 2,
  value,
  onChange,
}: ShikiEditorProps) {
  const [shiki, setShiki] = useState<Shiki | Error | null>(null);
  const [loadedLanguages, setLoadedLanguages] = useState<string[]>(preloadedLanguages);
  const [displayedLanguage, setDisplayedLanguage] = useState(language);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (!textareaRef.current) return;
      const [start, end] = [e.currentTarget.selectionStart, e.currentTarget.selectionEnd];
      if (e.key === "Tab") {
        e.preventDefault();
        onChange(
          curValue =>
            `${curValue.substring(0, start)}${" ".repeat(tabSize)}${curValue.substring(end)}`,
        );
        await delay(1); // without this artificial delay, the cursor won't be set correctly
        textareaRef.current.selectionStart = start + tabSize;
        textareaRef.current.selectionEnd = start + tabSize;
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        onChange(curValue => {
          const lines = curValue.substring(0, start).split("\n");
          const indent = /^\s*/.exec(lines[lines.length - 1])?.[0] ?? "";
          return `${curValue.substring(0, start)}\n${indent}${curValue.substring(end)}`;
        });
      }

      if (e.key === "Backspace") {
        if (start !== end) return; // selection. fallback to default behavior
        const line = e.currentTarget.value.substring(0, start).split("\n").pop();
        if (!line) return; // empty ("") before cursor, fallback to default behavior
        if (line.trim() !== "") return; // not empty before cursor, fallback to default behavior

        e.preventDefault();
        onChange(curValue => `${curValue.substring(0, start - tabSize)}${curValue.substring(end)}`);
        await delay(1); // without this artificial delay, the cursor won't be set correctly
        textareaRef.current.selectionStart = start - tabSize;
        textareaRef.current.selectionEnd = start - tabSize;
      }
    },
    [onChange, tabSize],
  );

  useEffect(() => {
    (async () => {
      const resolvedTheme = await getShikiTheme(theme);
      const highlighter = await getHighlighter({ theme: resolvedTheme, langs: preloadedLanguages });
      setShiki({ highlighter, theme: resolvedTheme });
    })().catch(() => setShiki(new Error()));
  }, [theme]);

  useEffect(() => {
    if (!shiki || shiki instanceof Error) return;
    if (loadedLanguages.includes(language)) {
      setDisplayedLanguage(language);
      return;
    }

    void (async () => {
      setDisplayedLanguage("plaintext");
      try {
        await shiki.highlighter.loadLanguage(language as Lang);
        setLoadedLanguages([...loadedLanguages, language]);
        setDisplayedLanguage(language);
      } catch {
        // Language is invalid, we just use plaintext
      }
    })();
  }, [language, loadedLanguages, shiki]);

  if (!shiki) return <LoadingScreen>Loading shiki&hellip;</LoadingScreen>;
  if (shiki instanceof Error) return <LoadingScreen>Failed to load shiki.</LoadingScreen>;

  const themeName = typeof shiki.theme === "string" ? shiki.theme : shiki.theme.name;
  return (
    <div className="flex flex-row font-mono text-sm">
      <div className="flex-grow overflow-x-auto">
        <div className="relative w-fit min-w-full">
          <div
            dangerouslySetInnerHTML={{
              __html: shiki.highlighter.codeToHtml(`${value}\n`, {
                lang: displayedLanguage,
                theme: themeName,
              }),
            }}
            className="[&_pre]:p-6 [&_pre]:pl-[60px]"
          />
          <div className="absolute inset-y-0 left-0 flex w-9 flex-col items-end py-6 text-text-tertiary">
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
            className="absolute inset-0 resize-none bg-transparent p-6 pl-[60px] text-transparent caret-text-primary focus:outline-none"
            spellCheck={false}
            autoCorrect="off"
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}
