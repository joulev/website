"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";

import { code as Code } from "~/components/blogs";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

function getEmoteIdFromInput(input: string) {
  const match = new RegExp(/\d{18,}/).exec(input);
  return match ? match[0] : null;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full" variants={{ variant: "primary" }}>
      Generate
    </Button>
  );
}

export function Form() {
  const [input, setInput] = useState("");
  const router = useRouter();
  const emoteId = getEmoteIdFromInput(input);
  return (
    <form
      className="flex flex-col gap-6 p-6 text-text-prose"
      action={() => router.push(`/apps/live-reaction/${emoteId}`)}
    >
      <div>
        Enter the emote ID (a number), or type a message containing only the emote and paste the
        message content here.
      </div>
      <div>
        Examples of accepted values: <Code>1059993646658760754</Code>,
        <Code>&lt;:ChisatoDerpThumbUp:1059993646658760754&gt;</Code>.
      </div>
      <div>
        Other values containing the emote ID are accepted too, though I can only make a guess in
        such cases and can&apos;t guarantee correctness.
      </div>
      <Input
        placeholder="Emote ID or message containing the emote"
        value={input}
        onValueChange={setInput}
        required
        className="text-text-primary"
      />
      {emoteId ? (
        <div>
          Detected emote ID: <strong className="text-text-primary">{emoteId}</strong>
        </div>
      ) : null}
      <SubmitButton />
    </form>
  );
}
