"use client";

import { useState } from "react";

import { Check, Copy } from "~/components/icons";
import { Button } from "~/components/ui/button";

export function useCopyState(delay = 1000) {
  const [showCopied, setShowCopied] = useState(false);
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout | null>(null);
  async function copy(content: string) {
    if (currentTimeout) clearTimeout(currentTimeout);
    await navigator.clipboard.writeText(content);
    setShowCopied(true);
    setCurrentTimeout(setTimeout(() => setShowCopied(false), delay));
  }
  return { showCopied, copy };
}

export function CopyButton({
  content,
  copyChildren = (
    <>
      <Copy />
      Copy
    </>
  ),
  copiedChildren = (
    <>
      <Check />
      Copied!
    </>
  ),
  onClick,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Button>, "children"> & {
  content: string;
  copyChildren?: React.ReactNode;
  copiedChildren?: React.ReactNode;
}) {
  const { showCopied, copy } = useCopyState();
  return (
    <Button
      onClick={async e => {
        await copy(content);
        onClick?.(e);
      }}
      {...props}
    >
      {showCopied ? copiedChildren : copyChildren}
    </Button>
  );
}
