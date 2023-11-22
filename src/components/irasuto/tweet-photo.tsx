"use client";

import dynamic from "next/dynamic";

import { Link } from "~/components/ui/link";
import type { Photo } from "~/lib/irasuto/types";

import { LazyImage } from "./lazy-image";

const DeleteButton = dynamic(() => import("./delete-button").then(mod => mod.DeleteButton));

export function TweetPhoto({
  storageKey,
  width,
  height,
  tweetUrl,
  authorName,
  authorHandle,
  allowDelete,
}: Photo & { allowDelete?: boolean }) {
  return (
    <div className="group relative overflow-hidden">
      <LazyImage
        src={`https://r2.joulev.dev/irasuto/${storageKey}`}
        alt={`Illustration by ${authorName}`}
        width={width}
        height={height}
      />
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
      {allowDelete ? <DeleteButton storageKey={storageKey} /> : null}
    </div>
  );
}
