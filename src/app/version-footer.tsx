"use client";

import { usePathname } from "next/navigation";

import { GitHub } from "~/components/icons";
import { Link } from "~/components/ui/link";
import { useAnimationKey } from "~/lib/animation-key";

export function VersionFooter() {
  const pathname = usePathname();
  const animationKey = useAnimationKey();
  if (pathname === "/blogs/walking-on-singapore-mrt-lines") return null;

  const sha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
  const url = sha
    ? `https://github.com/joulev/website/commit/${sha}`
    : "https://github.com/joulev/website";
  const label = sha ? sha.slice(0, 7) : "unknown";
  return (
    <footer
      key={animationKey}
      className="px-6 pb-12 flex flex-row justify-center text-xs text-text-tertiary elements-fade-in-on-load"
    >
      <div className="backdrop-blur bg-bg-darker px-3 py-1 rounded">
        <Link unstyled href={url} className="transition hover:text-text-secondary">
          <GitHub className="inline size-3" /> joulev/website@
          <span className="font-mono">{label}</span>
        </Link>
      </div>
    </footer>
  );
}
