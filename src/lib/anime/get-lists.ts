import { unstable_cache as cache } from "next/cache";
import { cache as dedupe } from "react";

import type { MediaListStatus } from "~/lib/gql/graphql";
import { getClient } from "~/lib/graphql";

import { GET_ANIME } from "./queries";
import { getTitle } from "./utils";

export type AnimeAllowedStatus =
  | "watching"
  | "rewatching"
  | "completed/tv"
  | "completed/movies"
  | "completed/others"
  | "paused"
  | "dropped"
  | "planning";

export type AnimeListItem = NonNullable<
  Awaited<ReturnType<typeof getAllLists>>["watching"][number]
>;

export type AnimeCardVariant =
  | "watching"
  | "rewatching"
  | "completed"
  | "completed-others"
  | "paused"
  | "dropped"
  | "planning";

const getAllLists = cache(
  async (status?: MediaListStatus) => {
    const client = getClient();
    const data = await client.request(GET_ANIME, { status });
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
  },
  [],
  { tags: ["anime-lists"] },
);

const getAllListsCached = dedupe(getAllLists);
export { getAllListsCached as getAllLists };

function sortList(list: (AnimeListItem | null)[], type: "planning" | "completed" | "others") {
  if (type === "planning")
    return [...list].sort((a, b) =>
      getTitle(a?.media?.title).localeCompare(getTitle(b?.media?.title)),
    );
  if (type === "completed")
    return [...list].sort((a, b) => {
      const aScore = a?.score ?? 0;
      const bScore = b?.score ?? 0;
      const titleCompare = getTitle(a?.media?.title).localeCompare(getTitle(b?.media?.title));

      // if an entry is not scored yet, push it to the top
      if (aScore === 0 && bScore === 0) return titleCompare;
      if (aScore === 0) return -1;
      if (bScore === 0) return 1;

      // if both entries are scored, sort by score, from main score to each subscore
      let curComp = bScore - aScore;
      if (curComp !== 0) return curComp;
      for (const key of Object.keys(
        (a?.advancedScores as Record<string, number> | undefined) ?? {},
      )) {
        curComp =
          ((b?.advancedScores as Record<string, number> | undefined)?.[key] ?? 0) -
          ((a?.advancedScores as Record<string, number> | undefined)?.[key] ?? 0);
        if (curComp !== 0) return curComp;
      }

      // all are equal, break tie by title
      return titleCompare;
    });
  return [...list].sort((a, b) => (b?.updatedAt ?? 0) - (a?.updatedAt ?? 0));
}

async function getListNotSorted(
  status: AnimeAllowedStatus,
): Promise<[(AnimeListItem | null)[], AnimeCardVariant]> {
  const lists = await getAllLists();
  switch (status) {
    case "watching":
      return [lists.watching, "watching"];
    case "rewatching":
      return [lists.rewatching, "rewatching"];
    case "completed/tv":
      return [lists.completedTV, "completed"];
    case "completed/movies":
      return [lists.completedMovies, "completed"];
    case "completed/others":
      return [lists.completedOthers, "completed-others"];
    case "paused":
      return [lists.paused, "paused"];
    case "dropped":
      return [lists.dropped, "dropped"];
    case "planning":
      return [lists.planning, "planning"];
    default:
      throw new Error("invariant: getList in [...status]/page.tsx");
  }
}

export async function getList(status: AnimeAllowedStatus) {
  const [list, variant] = await getListNotSorted(status);
  const sortedList = sortList(
    list,
    variant === "planning" ? "planning" : variant.includes("completed") ? "completed" : "others",
  ).filter((item): item is NonNullable<(typeof list)[number]> => item !== null);
  return [sortedList, variant] as const;
}
