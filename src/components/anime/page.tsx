"use client";
import { notFound } from "next/navigation";
import { useMemo } from "react";
import { List, ListContent, ListHeader } from "~/components/ui/lists";
import type { AnimeListItem, AnimeListItemStatus, AnimeLists } from "~/lib/anime/get-lists";
import { getListTitleFromStatus, getTitle } from "~/lib/anime/utils";
import { useAnimeData } from "./data-context";
import { EmptyState } from "./empty-state";

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

function getList(lists: AnimeLists, status: AnimeListItemStatus) {
  const list = lists[status];
  return sortList(
    list,
    status === "planning" ? "planning" : status.includes("completed") ? "completed" : "others",
  ).filter((item): item is NonNullable<(typeof list)[number]> => item !== null);
}

function AnimePageContentSafe({
  status,
  card: Card,
}: {
  status: AnimeListItemStatus;
  card: React.FC<{ item: AnimeListItem; status: AnimeListItemStatus }>;
}) {
  const { optimisticLists } = useAnimeData();
  const list = useMemo(() => getList(optimisticLists, status), [optimisticLists, status]);
  if (list.length === 0) return <EmptyState>No entries. Check back later.</EmptyState>;
  return (
    <List>
      <ListHeader>{getListTitleFromStatus(status)}</ListHeader>
      <ListContent>
        {list.map(item => (
          <Card key={item.id} item={item} status={status} />
        ))}
      </ListContent>
    </List>
  );
}

export function AnimePageContent({
  status: rawStatus,
  card,
}: {
  status: string[] | undefined;
  card: React.FC<{ item: AnimeListItem; status: AnimeListItemStatus }>;
}) {
  // the decodeURIComponent is here because on Vercel at the time of writing, navigating to
  // completed/tv gives ["completed%2Ftv"] instead of ["completed", "tv"] for some reasons.
  const status = decodeURIComponent(rawStatus?.join("/") ?? "watching");
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

  return <AnimePageContentSafe status={status} card={card} />;
}
