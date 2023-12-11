import { getAllSlugs, getPost } from "~/lib/blogs";

import type { PageProps, Params } from "./$types";

export default async function Page({ params }: PageProps) {
  const { title } = await getPost(params.slug);
  return title;
}

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getAllSlugs();
  return slugs.map(slug => ({ slug }));
}

export const dynamicParams = false;
