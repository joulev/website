"use server";

import { type GraphQLClient } from "graphql-request";
import { revalidatePath } from "next/cache";

import { type AnimeListItem } from "~/lib/anime/get-lists";
import {
  ADD_ANIME,
  DELETE_ANIME,
  UPDATE_PROGRESS,
  UPDATE_REPEAT,
  UPDATE_SCORE,
  UPDATE_STATUS,
} from "~/lib/anime/mutations";
import { getAccumulatedScore } from "~/lib/anime/utils";
import { getAuthenticatedGraphQLClient } from "~/lib/auth/helpers";
import { MediaListStatus } from "~/lib/gql/graphql";

function revalidateEverything() {
  revalidatePath("/apps/anime", "layout");
  revalidatePath("/admin/manage/anime", "layout");
}

function generateAction<T extends unknown[] = []>(
  callback: (client: GraphQLClient, ...data: T) => Promise<void>,
): (...data: T) => Promise<void> {
  return async (...args: T) => {
    const client = await getAuthenticatedGraphQLClient();
    await callback(client, ...args);
    revalidateEverything();
  };
}

export const incrementProgress = generateAction(async (client, item: AnimeListItem) => {
  await client.request(UPDATE_PROGRESS, { id: item.id, progress: (item.progress ?? 0) + 1 });
});

export const updateStatus = generateAction(
  async (client, item: AnimeListItem, status: MediaListStatus) => {
    await client.request(UPDATE_STATUS, { id: item.id, status });
  },
);

export const cancelRewatch = generateAction(async (client, item: AnimeListItem) => {
  await Promise.allSettled([
    client.request(UPDATE_STATUS, { id: item.id, status: MediaListStatus.Completed }),
    client.request(UPDATE_REPEAT, { id: item.id, repeat: 0, progress: item.media?.episodes ?? 0 }),
  ]);
});

export const updateScore = generateAction(async (client, item: AnimeListItem, scores: number[]) => {
  const accumulate = getAccumulatedScore(scores);
  await client.request(UPDATE_SCORE, { id: item.id, score: accumulate, advanced: scores });
});

export const removeFromList = generateAction(async (client, item: AnimeListItem) => {
  await client.request(DELETE_ANIME, { id: item.id });
});

export const addToPTW = generateAction(async (client, itemId: number) => {
  await client.request(ADD_ANIME, { mediaId: itemId });
});
