import type { Metadata } from "next";

import { meta } from "~/app/(public)/blogs/meta";
import { getMetadata } from "../seo";

export function formatTime(date: Date) {
  // "10 December 2023"
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export function makeMetadata(slug: string, overrideOg = false): Metadata {
  const metadata = meta.find(m => m.slug === slug);
  if (!metadata) throw new Error(`No metadata found for slug: ${slug}`);

  const title = `${metadata.title} | joulev.dev » blogs`;
  const description = `${metadata.description} A blog post by @joulev.`;

  const defaultMetadata = getMetadata({ title, description, url: `/blogs/${slug}` });
  return {
    ...defaultMetadata,
    openGraph: {
      ...(overrideOg ? {} : defaultMetadata.openGraph),
      type: "article",
      url: `/blogs/${slug}`,
    },
    alternates: {
      canonical: `/blogs/${slug}`,
    },
  };
}
