import { type Fragment, type Jsx, run } from "@mdx-js/mdx";
import * as brokenRuntime from "react/jsx-runtime";

import { getAllSlugs, getPost } from "~/lib/blogs";

import type { PageProps, Params } from "./$types";

// @ts-expect-error: the automatic react runtime is untyped.
// https://github.com/mdx-js/mdx/pull/2383
const runtime: { Fragment: Fragment; jsx: Jsx; jsxs: Jsx } = brokenRuntime;

export default async function Page({ params }: PageProps) {
  const { mdxOutput } = await getPost(params.slug);
  const { default: Content } = await run(mdxOutput, { ...runtime, baseUrl: import.meta.url });
  return <Content />;
}

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getAllSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { title } = await getPost(params.slug);
  return { title };
}

export const dynamicParams = false;
