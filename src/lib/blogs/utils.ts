import type { Metadata } from "next";

import { meta } from "~/app/(public)/blogs/meta";
import { opengraphImage } from "~/app/opengraph";

export function formatTime(date: Date) {
  // "10 December 2023"
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export function makeMetadata(slug: string, overrideOg = false): Metadata {
  const metadata = meta.find(m => m.slug === slug);
  if (!metadata) throw new Error(`No metadata found for slug: ${slug}`);

  const title = `${metadata.title} | joulev.dev » blogs`;
  const description = `${
    metadata.description.endsWith(".") ? metadata.description.slice(0, -1) : metadata.description
  }. A blog post by @joulev.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `/blogs/${slug}`,
      ...(overrideOg ? {} : opengraphImage),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/blogs/${slug}`,
    },
  };
}
