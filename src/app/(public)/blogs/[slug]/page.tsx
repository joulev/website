import { getAllSlugs, getPost } from "~/lib/blogs";

import type { PageProps, Params } from "./$types";

export default async function Page({ params }: PageProps) {
  const { html } = await getPost(params.slug);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
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
