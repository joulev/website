"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Balancer } from "react-wrap-balancer";

import { useCopyState } from "~/components/copy-button";
import { Check, Share } from "~/components/icons";
import { Button } from "~/components/ui/button";
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
    <h1 className="text-3xl font-bold md:text-4xl blog-lg:text-5xl">
      <Balancer>{title}</Balancer>
    </h1>
  );
}

export function PostedDate() {
  const { postedDate } = useMetadata();
  const publishedTime = new Date(postedDate);
  return (
    <div className="text-sm text-text-secondary">
      Posted{" "}
      <time dateTime={publishedTime.toISOString()} title={publishedTime.toISOString()}>
        {formatTime(publishedTime)}
      </time>
    </div>
  );
}

export function ViewSourceHistory() {
  const { slug } = useMetadata();
  const sourceLink = `https://github.com/joulev/website/blob/main/app/(public)/blogs/(posts)/${slug}/page.mdx`;
  const historyLink = `https://github.com/joulev/website/commits/main/app/(public)/blogs/(posts)/${slug}/page.mdx`;
  return (
    <div className="flex flex-row gap-4">
      <Link href={sourceLink}>View source</Link>
      <div className="w-px bg-separator" />
      <Link href={historyLink}>View history</Link>
    </div>
  );
}

export function ShareButton() {
  const { showCopied, copy } = useCopyState();
  return (
    <Button
      variants={{ size: "sm" }}
      onClick={async () => {
        try {
          await navigator.share({ title: document.title, url: window.location.href });
        } catch (e) {
          // User simply cancelled the share, nothing to do here
          if (e instanceof DOMException && e.name === "AbortError") return;
          // Otherwise the share failed, we fallback to copying the link
          await copy(window.location.href);
        }
      }}
    >
      {showCopied ? (
        <>
          <Check /> Link copied!
        </>
      ) : (
        <>
          <Share /> Share
        </>
      )}
    </Button>
  );
}

export function IncrementViews() {
  const { slug } = useMetadata();
  useEffect(() => {
    incrementViews(slug).catch(console.error);
  }, [slug]);
  return null;
}
