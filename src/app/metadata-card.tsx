import type { LucideIcon } from "lucide-react";

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
          <a
            href={href}
            className="text-text-secondary transition-colors hover:text-text-primary"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Icon className="h-4 w-4" />
          </a>
        </div>
        {right}
      </div>
    </div>
  );
}
