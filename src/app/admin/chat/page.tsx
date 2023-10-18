"use client";

import { useChat } from "ai/react";
import { useCallback, useState } from "react";

import { Title } from "~/components/title";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { TextArea } from "~/components/ui/textarea";
import { cn } from "~/lib/cn";

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
    <main className="container max-w-screen-md">
      <Card className="flex flex-col p-0">
        <div className="bg-bg-darker p-6">
          <Title title="chat" subtitle="Current model: GPT-4" />
        </div>
        {messages.map((m, index) => (
          <div
            key={index}
            className={cn(m.role === "user" || "bg-bg-darker", "flex flex-col gap-3 p-6")}
          >
            <div className="select-none text-xs uppercase tracking-widest text-text-secondary">
              {m.role === "user" ? "You" : "System"}
            </div>
            <div>{m.content}</div>
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
      </Card>
    </main>
  );
}
