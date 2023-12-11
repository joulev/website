import { allBlogPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { cache } from "react";
import rehypePrettyCode, { type Theme } from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import { env } from "~/env.mjs";

import type { PageProps, Params } from "./$types";

const getTheme = cache(async () => {
  const themeJson: unknown = await fetch(env.EDITOR_THEME_URL).then(r => r.json());
  return themeJson as Theme;
});

export default async function Page({ params }: PageProps) {
  const post = allBlogPosts.find(p => p._raw.flattenedPath === params.slug);
  if (!post) notFound();

  const html = String(
    await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypePrettyCode, { keepBackground: false, theme: await getTheme() })
      .use(rehypeStringify)
      .process(post.body.raw),
  );
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export function generateStaticParams(): Params[] {
  return allBlogPosts.map(post => ({ slug: post._raw.flattenedPath }));
}

export function generateMetadata({ params }: { params: Params }) {
  const post = allBlogPosts.find(p => p._raw.flattenedPath === params.slug);
  if (!post) return {};
  return { title: post.title };
}

export const dynamicParams = false;
