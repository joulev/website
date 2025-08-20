import type { Metadata } from "next";

export function getMetadata({
  title,
  description,
  // url,
}: {
  title: string;
  description: string;
  url: string;
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "/",
      images: [{ url: "https://joulev.dev/opengraph-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
