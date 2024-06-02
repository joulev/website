import { unstable_cache as cache } from "next/cache";
import { cache as dedupe } from "react";

import type { MediaListStatus } from "~/lib/gql/graphql";
import { getClient } from "~/lib/graphql";

import { GET_ANIME } from "./queries";

export type AnimeLists = Awaited<ReturnType<typeof getAllLists>>;
export type AnimeListItemStatus = keyof AnimeLists;
export type AnimeListItem = NonNullable<AnimeLists["watching"][number]>;

export const getAllLists = dedupe(
  cache(
    async (status?: MediaListStatus) => {
      const client = getClient();
      const data = await client.request(GET_ANIME, { status });
      const lists = data.MediaListCollection?.lists ?? [];
      return {
        watching: lists.find(list => list?.name === "Watching")?.entries ?? [],
        rewatching: lists.find(list => list?.name === "Rewatching")?.entries ?? [],
        paused: lists.find(list => list?.name === "Paused")?.entries ?? [],
        dropped: lists.find(list => list?.name === "Dropped")?.entries ?? [],
        planning: lists.find(list => list?.name === "Planning")?.entries ?? [],
        "completed/tv": lists.find(list => list?.name === "Completed TV")?.entries ?? [],
        "completed/movies": lists.find(list => list?.name === "Completed Movie")?.entries ?? [],
        "completed/others": lists
          .filter(
            list =>
              list?.name?.toLowerCase().includes("completed") &&
              !list.name.includes("TV") &&
              !list.name.includes("Movie"),
          )
          .flatMap(list => list?.entries ?? []),
      };
    },
    [],
    { tags: ["anime-lists"] },
  ),
);

export async function getAllIds() {
  const lists: Record<string, (AnimeListItem | null)[]> = await getAllLists();
  return Object.values(lists)
    .flat()
    .map(entry => entry?.mediaId ?? 0);
}
