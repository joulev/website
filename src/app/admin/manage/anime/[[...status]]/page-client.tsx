"use client";
import { AnimePageContent } from "~/components/anime/page";

import { Card } from "./card";

export function PageClient({ status }: { status: string[] | undefined }) {
  return <AnimePageContent status={status} card={Card} />;
}
