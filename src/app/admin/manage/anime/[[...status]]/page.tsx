import type { Metadata } from "next";

import { AnimePageContent } from "~/components/anime/page";
import { getListTitleFromStatus } from "~/lib/anime/utils";

import type { PageProps, Params } from "./$types";
import { Card } from "./card";

export default function Page({ params }: PageProps) {
  return <AnimePageContent status={params.status} card={Card} />;
}

export function generateMetadata({ params }: PageProps): Metadata {
  const status = params.status?.join("/") ?? "watching";
  return { title: getListTitleFromStatus(status, "404") };
}

export function generateStaticParams(): Params[] {
  return [
    { status: [] },
    { status: ["watching"] },
    { status: ["rewatching"] },
    { status: ["completed", "tv"] },
    { status: ["completed", "movies"] },
    { status: ["completed", "others"] },
    { status: ["paused"] },
    { status: ["dropped"] },
    { status: ["planning"] },
  ];
}

export const dynamicParams = false;
