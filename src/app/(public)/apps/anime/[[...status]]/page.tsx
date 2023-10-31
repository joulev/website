import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { List, ListContent, ListHeader } from "~/components/ui/lists";

import { type AnimeListItem, getLists } from "../get-lists";
import { getListTitleFromStatus, getTitle } from "../utils";
import type { PageProps } from "./$types";
import { Card, type CardVariant } from "./card";

type AllowedStatus =
  | "watching"
  | "rewatching"
  | "completed/tv"
  | "completed/movies"
  | "completed/others"
  | "paused"
  | "dropped"
  | "planning";

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

async function getList(status: AllowedStatus): Promise<[(AnimeListItem | null)[], CardVariant]> {
  const lists = await getLists();
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

export default async function Page({ params }: PageProps) {
  const status = params.status?.join("/") ?? "watching";
  if (
    status !== "watching" &&
    status !== "rewatching" &&
    status !== "completed/tv" &&
    status !== "completed/movies" &&
    status !== "completed/others" &&
    status !== "paused" &&
    status !== "dropped" &&
    status !== "planning"
  )
    notFound();

  const [list, variant] = await getList(status);
  if (list.length === 0)
    return (
      <div className="px-6 py-12 text-center text-text-secondary">
        No entries. Check back later.
      </div>
    );

  const sortedList = sortList(
    list,
    // eslint-disable-next-line no-nested-ternary -- does this look *that* unreadable?
    variant === "planning" ? "planning" : variant.includes("completed") ? "completed" : "others",
  ).filter((item): item is NonNullable<(typeof list)[number]> => item !== null);

  return (
    <List>
      <ListHeader>{getListTitleFromStatus(status)}</ListHeader>
      <ListContent>
        {sortedList.map(item => (
          <Card key={item.id} item={item} variant={variant} />
        ))}
      </ListContent>
    </List>
  );
}

export function generateMetadata({ params }: PageProps): Metadata {
  const status = params.status?.join("/") ?? "watching";
  return { title: getListTitleFromStatus(status, "404") };
}

// export function generateStaticParams(): Params[] {
//   return [
//     { status: [] },
//     { status: ["watching"] },
//     { status: ["rewatching"] },
//     { status: ["completed", "tv"] },
//     { status: ["completed", "movies"] },
//     { status: ["completed", "others"] },
//     { status: ["paused"] },
//     { status: ["dropped"] },
//     { status: ["planning"] },
//   ];
// }

// export const dynamicParams = false;
export const revalidate = 0;
