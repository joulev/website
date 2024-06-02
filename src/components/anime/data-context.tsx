"use client";
import { useState } from "react";
import type { AnimeLists } from "~/lib/anime/get-lists";
import { generateContext } from "~/lib/hooks/generate-context";

const [Provider, useAnimeData] = generateContext<{
  lists: AnimeLists;
  setLists: React.Dispatch<React.SetStateAction<AnimeLists>>;
}>("AnimeData");
export { useAnimeData };

export function AnimeDataContextProvider({
  lists: initialLists,
  children,
}: { lists: AnimeLists; children: React.ReactNode }) {
  const [lists, setLists] = useState(initialLists);
  return <Provider value={{ lists, setLists }}>{children}</Provider>;
}
