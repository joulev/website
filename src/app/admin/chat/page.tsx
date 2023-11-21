"use client";

import { useChat } from "ai/react";
import { useCallback, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Title } from "~/components/title";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Link } from "~/components/ui/link";
import { TextArea } from "~/components/ui/textarea";

function Pre(props: React.ComponentPropsWithoutRef<"pre">) {
  return <pre {...props} className="-mx-6 rounded-[0] bg-bg-darker px-6 py-3 text-sm" />;
}

function A({ href, ...props }: React.ComponentPropsWithoutRef<"a">) {
  return <Link {...props} href={href || ""} className="no-underline" />;
}

export default function Page() {
  const { messages, append } = useChat({ api: "/admin/chat/api" });
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
          {messages.map((m, index) => (
            <div key={index} className="flex flex-col gap-3 p-6">
              <div className="select-none text-xs uppercase tracking-widest text-text-secondary">
                {m.role === "user" ? "You" : "System"}
              </div>
              <div className="prose max-w-full">
                <Markdown remarkPlugins={[remarkGfm]} components={{ pre: Pre, a: A }}>
                  {m.content}
                </Markdown>
              </div>
            </div>
          ))}
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
