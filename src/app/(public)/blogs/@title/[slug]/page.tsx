import { allBlogPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";

import type { PageProps, Params } from "./$types";

export default function Page({ params }: PageProps) {
  const post = allBlogPosts.find(p => p._raw.flattenedPath === params.slug);
  if (!post) notFound();
  return post.title;
}

export function generateMetadata({ params }: { params: Params }) {
  const post = allBlogPosts.find(p => p._raw.flattenedPath === params.slug);
  if (!post) return {};
  return { title: post.title };
}

export const dynamicParams = false;
