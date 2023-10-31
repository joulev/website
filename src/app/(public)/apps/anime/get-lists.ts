import { cache } from "react";

import { getClient } from "~/lib/apollo/client";

import { GET_ANIME, type MediaListStatus } from "./queries";

export type AnimeListItem = NonNullable<Awaited<ReturnType<typeof getLists>>["watching"][number]>;

export const getLists = cache(async (status?: MediaListStatus) => {
  const client = getClient();
  const { data } = await client.query({
    query: GET_ANIME,
    variables: { status },
    context: { fetchOptions: { next: { tags: ["lists"] } } satisfies RequestInit },
  });
  const lists = data.MediaListCollection?.lists ?? [];
  return {
    lists,
    watching: lists.find(list => list?.name === "Watching")?.entries ?? [],
    rewatching: lists.find(list => list?.name === "Rewatching")?.entries ?? [],
    paused: lists.find(list => list?.name === "Paused")?.entries ?? [],
    dropped: lists.find(list => list?.name === "Dropped")?.entries ?? [],
    planning: lists.find(list => list?.name === "Planning")?.entries ?? [],
    completedTV: lists.find(list => list?.name === "Completed TV")?.entries ?? [],
    completedMovies: lists.find(list => list?.name === "Completed Movie")?.entries ?? [],
    completedOthers: lists
      .filter(
        list =>
          list?.name?.toLowerCase().includes("completed") &&
          !list.name.includes("TV") &&
          !list.name.includes("Movie"),
      )
      .flatMap(list => list?.entries ?? []),
  };
});
