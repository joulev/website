"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Balancer } from "react-wrap-balancer";
import { useHoverBackground } from "~/components/ui/hooks/use-hover-background";
import { Link } from "~/components/ui/link";
import { incrementViews } from "~/lib/blogs/increment-view";
import { formatTime } from "~/lib/blogs/utils";
import { meta } from "../meta";

function useMetadata() {
  const pathname = usePathname();
  const slug = pathname.split("/").pop();
  const metadata = meta.find(m => m.slug === slug);
  if (!metadata) throw new Error(`No metadata found for slug ${slug}`);
  return metadata;
}

export function PostTitle() {
  const { title } = useMetadata();
  return (
    <h1 className="text-3xl font-medium md:text-4xl blog-lg:text-5xl">
      <Balancer>{title}</Balancer>
    </h1>
  );
}

export function PostedDate() {
  const { postedDate } = useMetadata();
  const publishedTime = new Date(postedDate);
  return (
    <p className="max-blog-lg:text-sm text-text-secondary">
      <time dateTime={publishedTime.toISOString().split("T")[0]}>{formatTime(publishedTime)}</time>
    </p>
  );
}

export function Author() {
  return (
    <div className="-m-3">
      <a
        href="https://github.com/joulev"
        target="_blank"
        rel="noreferrer noopener"
        className="hover-bg relative flex flex-row items-center gap-3 w-fit rounded m-1 p-2 hover:bg-bg-idle hover:m-0 hover:p-3 active:bg-bg-active transition-all"
        {...useHoverBackground({})}
      >
        <p className="sr-only">Written by</p>
        <img
          src="https://avatars.githubusercontent.com/u/44609036"
          alt="Vu Van Dung"
          className="size-9 shrink-0 rounded-full"
        />
        <div className="flex flex-col gap-1.5">
          <div className="blog-lg:text-lg font-semibold leading-none blog-lg:leading-none">
            Vu Van Dung
          </div>
          <div className="text-sm text-text-secondary leading-none">@joulev</div>
        </div>
      </a>
    </div>
  );
}

export function ViewSourceHistory() {
  const { slug } = useMetadata();
  const sourceLink = `https://github.com/joulev/website/blob/main/src/app/(public)/blogs/(posts)/${slug}/page.mdx`;
  const historyLink = `https://github.com/joulev/website/commits/main/src/app/(public)/blogs/(posts)/${slug}/page.mdx`;
  return (
    <div className="flex flex-row gap-4">
      <Link href={sourceLink}>View source</Link>
      <div className="w-px bg-separator" />
      <Link href={historyLink}>View history</Link>
    </div>
  );
}

export function IncrementViews() {
  const { slug } = useMetadata();
  useEffect(() => {
    incrementViews(slug).catch(console.error);
  }, [slug]);
  return null;
}
