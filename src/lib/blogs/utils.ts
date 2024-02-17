import type { Metadata } from "next";

import { meta } from "~/app/(public)/blogs/meta";

export function formatTime(date: Date) {
  // "10 December 2023"
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export function makeMetadata(slug: string): Metadata {
  const metadata = meta.find(m => m.slug === slug);
  if (!metadata) throw new Error(`No metadata found for slug: ${slug}`);

  const ogImage = `/blogs/og?title=${encodeURIComponent(metadata.title)}`;
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    alternates: {
      canonical: `/blogs/${slug}`,
    },
  };
}
