"use client";

import { Link } from "~/components/ui/link";

import { LazyImage } from "./lazy-image";
import type { Photo } from "./types";

export function TweetPhoto({ url, width, height, tweetUrl, authorName, authorHandle }: Photo) {
  return (
    <div className="group relative overflow-hidden">
      <LazyImage src={url} alt={`Illustration by ${authorName}`} width={width} height={height} />
      <Link
        href={tweetUrl}
        unstyled
        className="absolute inset-0 flex flex-col justify-end bg-gradient-to-b from-[#0000] to-[#000c] p-6 opacity-0 transition [.group:hover_&]:opacity-100"
      >
        <div className="flex flex-col justify-end">
          <div className="font-semibold text-text-primary">{authorName}</div>
          <div className="text-sm text-text-secondary">@{authorHandle}</div>
        </div>
      </Link>
    </div>
  );
}
