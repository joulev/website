"use client";

import { useCopyState } from "~/components/copy-button";
import { Check } from "~/components/icons";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";

export function DropdownMenuItemCopyButton({
  content,
  icon,
  children,
}: {
  content: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const { showCopied, copy } = useCopyState();
  return (
    <DropdownMenuItem onClick={() => copy(content)}>
      {showCopied ? <Check /> : icon}
      <span>{children}</span>
    </DropdownMenuItem>
  );
}
