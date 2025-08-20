"use client";
import { produce } from "immer";
import { useOptimistic } from "react";
import type { AnimeListItemStatus, AnimeLists } from "~/lib/anime/get-lists";
import { getAccumulatedScore } from "~/lib/anime/utils";
import { generateContext } from "~/lib/hooks/generate-context";
import { useNProgress } from "~/lib/hooks/use-nprogress";

type OptimisticValue = { lists: AnimeLists; pending: boolean };
type ReducerAction =
  | ["UPDATE_SCORE", { status: AnimeListItemStatus; id: number; advancedScores: number[] }]
  | ["UPDATE_STATUS", { status: AnimeListItemStatus; id: number; newStatus: AnimeListItemStatus }]
  | ["UPDATE_PROGRESS", { status: AnimeListItemStatus; id: number }]
  | ["CANCEL_REWATCH", { id: number; newStatus: AnimeListItemStatus }]
  | ["REMOVE", { status: AnimeListItemStatus; id: number }];

const [Provider, useAnimeData] = generateContext<{
  pending: boolean;
  optimisticLists: AnimeLists;
  optimisticListsAct: (reducerArgument: ReducerAction) => void;
}>("AnimeData");
export { useAnimeData };

function optimisticReducer(current: OptimisticValue, action: ReducerAction): OptimisticValue {
  return produce(current, draft => {
    const [type, data] = action;
    draft.pending = true;
    switch (type) {
      case "UPDATE_SCORE": {
        const item = draft.lists[data.status].find(i => i?.id === data.id);
        if (!item) return;
        item.pending = true;
        item.advancedScores = data.advancedScores;
        item.score = getAccumulatedScore(data.advancedScores);
        break;
      }
      case "UPDATE_STATUS": {
        const item = draft.lists[data.status].find(i => i?.id === data.id);
        if (!item) return;
        item.pending = true;
        draft.lists[data.newStatus].push(item);
        draft.lists[data.status] = draft.lists[data.status].filter(i => i?.id !== data.id);
        break;
      }
      case "UPDATE_PROGRESS": {
        const item = draft.lists[data.status].find(i => i?.id === data.id);
        if (!item) return;
        item.pending = true;
        item.progress = (item.progress ?? 0) + 1;
        break;
      }
      case "CANCEL_REWATCH": {
        const item = draft.lists.rewatching.find(i => i?.id === data.id);
        if (!item) return;
        item.pending = true;
        draft.lists.rewatching = draft.lists.rewatching.filter(i => i?.id !== data.id);
        draft.lists[data.newStatus].push(item);
        break;
      }
      case "REMOVE": {
        draft.lists[data.status] = draft.lists[data.status].filter(i => i?.id !== data.id);
        break;
      }
    }
  });
}

export function AnimeDataContextProvider({
  value,
  children,
}: {
  value: OptimisticValue;
  children: React.ReactNode;
}) {
  const [optimisticValue, optimisticListsAct] = useOptimistic(value, optimisticReducer);
  useNProgress(optimisticValue.pending);
  return (
    <Provider
      value={{
        pending: optimisticValue.pending,
        optimisticLists: optimisticValue.lists,
        optimisticListsAct,
      }}
    >
      {children}
    </Provider>
  );
}
