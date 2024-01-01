"use client";

import { useState } from "react";

import { Button } from "~/components/ui/button";
import { TextArea } from "~/components/ui/textarea";
import { cn } from "~/lib/cn";
import type { Mood } from "~/lib/db/schema";

import { submitMood } from "./submit-mood-action";

function MoodButton({
  isActive,
  onClick,
  children,
}: {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={cn(
        isActive ? "scale-125" : "grayscale hover:grayscale-0",
        "text-3xl transition-all",
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function MoodForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mood, setMood] = useState<Mood | null>(null);
  const [comment, setComment] = useState("");
  const canSubmit = mood !== null && comment !== "";
  return (
    <form
      className="flex flex-col items-center gap-6 p-6"
      onSubmit={async e => {
        e.preventDefault();
        if (!canSubmit) return;
        setIsSubmitting(true);
        await submitMood(mood, comment);
        setIsSubmitting(false);
        setMood(null);
        setComment("");
      }}
    >
      <p>How are you today?</p>
      <div className="flex flex-row-reverse justify-center gap-3">
        {(
          [
            ["🤩", "wonderful"],
            ["🙂", "good"],
            ["😐", "meh"],
            ["🙁", "bad"],
            ["😩", "horrible"],
          ] as const
        ).map(([emoji, entryMood]) => (
          <MoodButton
            key={entryMood}
            isActive={mood === entryMood}
            onClick={() => setMood(x => (x && x === entryMood ? null : entryMood))}
          >
            {emoji}
          </MoodButton>
        ))}
      </div>
      <div className="w-full">
        <TextArea required value={comment} onValueChange={setComment} className="h-48" />
      </div>
      <Button
        variants={{ variant: "primary" }}
        className="w-full"
        disabled={!canSubmit || isSubmitting}
      >
        Submit
      </Button>
    </form>
  );
}
