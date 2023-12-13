"use client";

import { useHoverBackground } from "~/components/ui/hooks/use-hover-background";
import { Link } from "~/components/ui/link";

export function PostCard({ slug, children }: { slug: string; children: React.ReactNode }) {
  return (
    <Link
      href={`/blogs/${slug}`}
      unstyled
      className="hover-bg transition hover:bg-bg-hover active:bg-bg-active"
      {...useHoverBackground({})}
    >
      {children}
    </Link>
  );
}
