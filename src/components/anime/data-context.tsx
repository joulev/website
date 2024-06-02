"use client";
import { produce } from "immer";
import { useOptimistic } from "react";
import type { AnimeListItemStatus, AnimeLists } from "~/lib/anime/get-lists";
import { getAccumulatedScore } from "~/lib/anime/utils";
import { generateContext } from "~/lib/hooks/generate-context";

type ReducerAction =
  | ["UPDATE_SCORE", { status: AnimeListItemStatus; id: number; advancedScores: number[] }]
  | ["UPDATE_STATUS", { status: AnimeListItemStatus; id: number; newStatus: AnimeListItemStatus }]
  | ["UPDATE_PROGRESS", { status: AnimeListItemStatus; id: number }]
  | ["CANCEL_REWATCH", { id: number; newStatus: AnimeListItemStatus }]
  | ["REMOVE", { status: AnimeListItemStatus; id: number }];

const [Provider, useAnimeData] = generateContext<{
  optimisticLists: AnimeLists;
  optimisticListsAct: (reducerArgument: ReducerAction) => void;
}>("AnimeData");
export { useAnimeData };

function optimisticReducer(current: AnimeLists, action: ReducerAction): AnimeLists {
  return produce(current, draft => {
    const [type, data] = action;
    switch (type) {
      case "UPDATE_SCORE": {
        const item = draft[data.status].find(i => i?.id === data.id);
        if (!item) return;
        item.advancedScores = data.advancedScores;
        item.score = getAccumulatedScore(data.advancedScores);
        break;
      }
      case "UPDATE_STATUS": {
        const item = draft[data.status].find(i => i?.id === data.id);
        if (!item) return;
        draft[data.newStatus].push(item);
        draft[data.status] = draft[data.status].filter(i => i?.id !== data.id);
        break;
      }
      case "UPDATE_PROGRESS": {
        const item = draft[data.status].find(i => i?.id === data.id);
        if (!item) return;
        item.progress = (item.progress ?? 0) + 1;
        break;
      }
      case "CANCEL_REWATCH": {
        const item = draft.rewatching.find(i => i?.id === data.id);
        if (!item) return;
        draft.rewatching = draft.rewatching.filter(i => i?.id !== data.id);
        draft[data.newStatus].push(item);
        break;
      }
      case "REMOVE": {
        draft[data.status] = draft[data.status].filter(i => i?.id !== data.id);
        break;
      }
    }
  });
}

export function AnimeDataContextProvider({
  lists,
  children,
}: { lists: AnimeLists; children: React.ReactNode }) {
  const [optimisticLists, optimisticListsAct] = useOptimistic(lists, optimisticReducer);
  return <Provider value={{ optimisticLists, optimisticListsAct }}>{children}</Provider>;
}
