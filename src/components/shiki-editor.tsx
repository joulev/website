import { useEffect, useState } from "react";
import {
  type Highlighter,
  type IShikiTheme,
  type Lang,
  type Theme,
  getHighlighter,
  setCDN,
  toShikiTheme,
} from "shiki";

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

export function ShikiEditor({
  theme,
  language,
  value,
  onChange,
}: {
  /**
   * URL to the theme JSON, or one of the default theme
   */
  // eslint-disable-next-line @typescript-eslint/ban-types -- This is an IDE hack for autocompletion yet allowing all strings
  theme: Theme | (string & {});
  // eslint-disable-next-line @typescript-eslint/ban-types -- This is an IDE hack for autocompletion yet allowing all strings
  language: Lang | (string & {});
  value: string;
  onChange: (value: string) => void;
}) {
  const [shiki, setShiki] = useState<Shiki | Error | null>(null);
  const [loadedLanguages, setLoadedLanguages] = useState<string[]>(preloadedLanguages);
  const [displayedLanguage, setDisplayedLanguage] = useState(language);

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
            value={value}
            onChange={e => onChange(e.target.value)}
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
