"use client";

import { useParams } from "next/navigation";

import { CopyButton } from "~/components/copy-button";
import { Check, Share } from "~/components/icons";
import { Link } from "~/components/ui/link";

function useSlug() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  // if (!slug) throw new Error("Slug not found");
  return slug;
}

export function ViewSourceLink() {
  const slug = useSlug();
  return (
    <Link href={`https://github.com/joulev/website/blob/main/contents/blogs/${slug}.mdx`}>
      View source
    </Link>
  );
}

export function ViewHistoryLink() {
  const slug = useSlug();
  return (
    <Link href={`https://github.com/joulev/website/commits/main/contents/blogs/${slug}.mdx`}>
      View history
    </Link>
  );
}

export function ArticleCopyButton() {
  const slug = useSlug();
  return (
    <CopyButton
      content={`https://joulev.dev/blogs/${slug}`}
      variants={{ size: "sm" }}
      copyChildren={
        <>
          <Share /> Share
        </>
      }
      copiedChildren={
        <>
          <Check /> Link copied!
        </>
      }
    />
  );
}
