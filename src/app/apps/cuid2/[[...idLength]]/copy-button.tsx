"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { Button } from "~/components/ui/button";

export function CopyButton({ content }: { content: string }) {
  const [showCopied, setShowCopied] = useState(false);
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout | null>(null);
  async function copy() {
    if (currentTimeout) clearTimeout(currentTimeout);
    await navigator.clipboard.writeText(content);
    setShowCopied(true);
    setCurrentTimeout(setTimeout(() => setShowCopied(false), 1000));
  }
  return (
    <Button onClick={() => copy()}>
      {showCopied ? (
        <>
          <Check />
          Copied!
        </>
      ) : (
        <>
          <Copy />
          Copy
        </>
      )}
    </Button>
  );
}
