import type { LucideIcon } from "lucide-react";

import { LinkButton } from "~/components/ui/button";

export function MetadataCard({
  left,
  right,
  title,
  icon: Icon,
  href,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  title: string;
  icon: LucideIcon;
  href: string;
}) {
  return (
    <div className="recessed relative flex flex-row gap-3 overflow-hidden rounded-[1.25rem] p-3">
      {left}
      <div className="flex min-w-0 flex-grow flex-col">
        <div className="flex flex-grow flex-row justify-between">
          <div className="text-xs font-light uppercase tracking-widest text-text-tertiary">
            {title}
          </div>
          <LinkButton
            href={href}
            variants={{ variant: "ghost", size: "icon-sm" }}
            className="-m-1.5 text-text-secondary hover:text-text-primary"
          >
            <Icon className="h-4 w-4" />
          </LinkButton>
        </div>
        {right}
      </div>
    </div>
  );
}
