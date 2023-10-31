import { AnimePageContent } from "~/components/anime/page";

import type { PageProps, Params } from "./$types";
import { Card } from "./card";

export default function Page({ params }: PageProps) {
  return <AnimePageContent status={params.status} card={Card} />;
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
