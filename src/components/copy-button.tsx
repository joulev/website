"use client";

import { useState } from "react";

import { Check, Copy } from "~/components/icons";
import { Button } from "~/components/ui/button";

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
  const [showCopied, setShowCopied] = useState(false);
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout | null>(null);
  async function copy(e: React.MouseEvent<HTMLButtonElement>) {
    if (currentTimeout) clearTimeout(currentTimeout);
    await navigator.clipboard.writeText(content);
    setShowCopied(true);
    setCurrentTimeout(setTimeout(() => setShowCopied(false), 1000));
    onClick?.(e);
  }
  return (
    <Button onClick={copy} {...props}>
      {showCopied ? copiedChildren : copyChildren}
    </Button>
  );
}
