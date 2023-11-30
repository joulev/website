"use client";

import { useChat } from "ai/react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import Markdown, { type ExtraProps } from "react-markdown";
import remarkGfm from "remark-gfm";
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
import { Link } from "~/components/ui/link";
import { TextArea } from "~/components/ui/textarea";
import { generateContext } from "~/lib/hooks/generate-context";

setCDN("/vendored/shiki/");

interface Shiki {
  highlighter: Highlighter | null;
  theme: IShikiTheme | null;
}

const [ShikiContext, useShiki] = generateContext<Shiki>();

const preloadedLanguages: Lang[] = ["tsx", "css", "html", "json"];

function useShikiInit() {
  const [theme, setTheme] = useState<IShikiTheme | null>(null);
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null);
  useEffect(() => {
    void (async () => {
      const themeJson: unknown = await fetch("/admin/snippets/get-theme").then(r => r.json());
      const fetchedTheme = toShikiTheme(themeJson as Parameters<typeof toShikiTheme>[0]);
      setTheme(fetchedTheme);
      setHighlighter(await getHighlighter({ theme: fetchedTheme, langs: preloadedLanguages }));
    })();
  }, []);
  return { theme, highlighter };
}

const PreWhenShikiIsLoaded = memo(
  function PreWhenShikiIsLoaded({ language, content }: { language: string; content: string }) {
    const { highlighter, theme } = useShiki();
    const html = useMemo(() => {
      if (!highlighter || !theme) return null;
      return highlighter.codeToHtml(content, { lang: language, theme: theme.name });
    }, [highlighter, theme, language, content]);
    if (!html) return null;
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: html,
        }}
        className="[&_pre]:-mx-6 [&_pre]:rounded-[0] [&_pre]:bg-bg-darker [&_pre]:px-6 [&_pre]:py-3 [&_pre]:text-sm"
      />
    );
  },
  (prev, next) => prev.language === next.language && prev.content === next.content,
);

function Pre({ node, children }: React.ComponentPropsWithoutRef<"pre"> & ExtraProps) {
  const { highlighter, theme } = useShiki();

  if (!highlighter || !theme)
    return <pre className="-mx-6 rounded-[0] bg-bg-darker px-6 py-3 text-sm">{children}</pre>;

  // @ts-expect-error -- It's `any` after all
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- It's any after all
  let language = node.children[0].properties.className?.[0].slice("language-".length) as string;
  if (["ts", "js", "tsx", "jsx", "typescript", "javascript"].includes(language)) language = "tsx";
  // @ts-expect-error -- It's `any` after all
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- It's any after all
  const content = node.children[0].children[0].value as string;

  return <PreWhenShikiIsLoaded language={language} content={content} />;
}

function A({ href, ...props }: React.ComponentPropsWithoutRef<"a">) {
  return <Link {...props} href={href || ""} className="no-underline" />;
}

const MemoisedMarkdown = memo(
  function MarkdownRenderer({ content }: { content: string }) {
    return (
      <Markdown remarkPlugins={[remarkGfm]} components={{ pre: Pre, a: A }}>
        {content}
      </Markdown>
    );
  },
  (prev, next) => prev.content === next.content,
);

export default function Page() {
  const { messages, append } = useChat({ api: "/admin/chat/api" });
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { theme, highlighter } = useShikiInit();

  const submit = useCallback(async () => {
    setIsLoading(true);
    try {
      await append({ role: "user", content: prompt });
      setPrompt("");
    } catch {
      // eslint-disable-next-line no-alert -- I (as the only user) am fine with it
      alert("Fetch failed, please try again later.");
    }
    setIsLoading(false);
  }, [append, prompt]);

  const onKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && e.shiftKey && !isLoading) {
        e.preventDefault();
        await submit();
      }
    },
    [isLoading, submit],
  );

  return (
    <main className="container max-w-screen-lg">
      <Card className="flex flex-col p-0 md:flex-row">
        <div className="border-b border-separator bg-bg-darker p-6 md:w-64 md:shrink-0 md:border-r">
          <Title title="chat" subtitle={<>Current model: GPT&#8209;4&nbsp;Turbo</>} />
        </div>
        <div className="flex max-w-full flex-grow flex-col divide-y divide-separator overflow-x-auto">
          <ShikiContext value={{ highlighter, theme }}>
            {messages.map((m, index) => (
              <div key={index} className="flex flex-col gap-3 p-6">
                <div className="select-none text-xs uppercase tracking-widest text-text-secondary">
                  {m.role === "user" ? "You" : "System"}
                </div>
                <div className="prose max-w-full">
                  <MemoisedMarkdown content={m.content} />
                </div>
              </div>
            ))}
          </ShikiContext>
          <div className="flex flex-col gap-3 p-6">
            <TextArea
              className="h-24 w-full"
              value={prompt}
              onValueChange={setPrompt}
              onKeyDown={onKeyDown}
              disabled={isLoading}
            />
            <div className="flex flex-row justify-end">
              <Button variants={{ variant: "primary" }} onClick={submit} disabled={isLoading}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </main>
  );
}
