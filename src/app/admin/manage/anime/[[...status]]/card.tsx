"use client";

import { startTransition, useState } from "react";
import { useAnimeData } from "~/components/anime/data-context";

import {
  Move3d as Animation,
  User as Character,
  ChevronsRight,
  Smile as Enjoyment,
  Music,
  Pause,
  Pencil,
  Play,
  Repeat,
  StopCircle,
  AlignJustify as Story,
  Trash,
  X,
} from "~/components/icons";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { ListItem } from "~/components/ui/lists";
import {
  cancelRewatch as cancelRewatchAction,
  incrementProgress,
  removeFromList,
  updateScore,
  updateStatus,
} from "~/lib/anime/actions";
import type { AnimeListItem, AnimeListItemStatus } from "~/lib/anime/get-lists";
import { constraintScore, convertSeason, getAccumulatedScore, getTitle } from "~/lib/anime/utils";
import { cn } from "~/lib/cn";
import { MediaFormat, MediaListStatus, MediaStatus } from "~/lib/gql/graphql";

function BottomPartTemplate({
  text,
  children,
}: { text: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex flex-row flex-wrap items-end gap-x-3">
      <div className="flex-grow text-sm text-text-secondary">{text}</div>
      <div className="flex flex-row-reverse gap-3">{children}</div>
    </div>
  );
}

const icons = [Enjoyment, Story, Character, Animation, Music];
const keys = ["Enjoyment", "Story", "Characters", "Animation", "Music"] as const;

function UpdateItemScore({ item, status }: { item: AnimeListItem; status: AnimeListItemStatus }) {
  const { optimisticListsAct } = useAnimeData();

  const advancedScores = item.advancedScores as Record<(typeof keys)[number], string | undefined>;
  const originalScoresStr = keys.map(key => String(advancedScores[key] ?? "0"));
  const [scoresStr, setScoresStr] = useState(originalScoresStr);
  const scores = scoresStr.map(score => constraintScore(Number(score)));
  const accumulate = getAccumulatedScore(scores);
  const setScore = () =>
    startTransition(async () => {
      optimisticListsAct(["UPDATE_SCORE", { status, id: item.id, advancedScores: scores }]);
      await updateScore(item, scores);
    });

  return (
    <Dialog onOpenChange={isOpen => isOpen || setScoresStr(originalScoresStr)}>
      <DialogTrigger asChild>
        <Button variants={{ size: "icon-sm" }}>
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{getTitle(item.media?.title)}</DialogTitle>
          <DialogDescription>Update component scores of this anime</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
          {icons.map((Icon, i) => (
            <div className="flex flex-row items-center gap-3" key={keys[i]}>
              <Icon
                className={cn(
                  "shrink-0 transition",
                  scores[i] !== Number(advancedScores[keys[i]])
                    ? "text-text-primary"
                    : "text-text-secondary",
                )}
              />
              <div className="flex-grow">
                <Input
                  value={scoresStr[i]}
                  onValueChange={value =>
                    setScoresStr([...scoresStr.slice(0, i), value, ...scoresStr.slice(i + 1)])
                  }
                />
              </div>
            </div>
          ))}
        </div>
        <div className="recessed rounded bg-bg-darker p-6 text-center text-text-secondary">
          Score: <span className="font-bold text-text-primary">{accumulate}</span>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="w-full sm:w-auto">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="w-full sm:w-auto"
              variants={{ variant: "primary" }}
              onClick={setScore}
            >
              Update
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function checkProgressBehind(item: AnimeListItem) {
  if (item.media?.status !== MediaStatus.Releasing) return false;
  const nextAiring = item.media?.nextAiringEpisode?.episode;
  if (!nextAiring) return false;
  const watchedEpisodes = item.progress ?? 0;
  const behindBy = nextAiring - watchedEpisodes - 1;
  return behindBy > 0;
}

function BottomPart({ item, status }: { item: AnimeListItem; status: AnimeListItemStatus }) {
  const { optimisticListsAct } = useAnimeData();

  const setAsWatching = () =>
    startTransition(async () => {
      optimisticListsAct(["UPDATE_STATUS", { status, id: item.id, newStatus: "watching" }]);
      await updateStatus(item, MediaListStatus.Current);
    });
  const setAsRewatching = () =>
    startTransition(async () => {
      optimisticListsAct(["UPDATE_STATUS", { status, id: item.id, newStatus: "rewatching" }]);
      await updateStatus(item, MediaListStatus.Repeating);
    });
  const setAsPaused = () =>
    startTransition(async () => {
      optimisticListsAct(["UPDATE_STATUS", { status, id: item.id, newStatus: "paused" }]);
      await updateStatus(item, MediaListStatus.Paused);
    });
  const setAsDropped = () =>
    startTransition(async () => {
      optimisticListsAct(["UPDATE_STATUS", { status, id: item.id, newStatus: "dropped" }]);
      await updateStatus(item, MediaListStatus.Dropped);
    });
  const increment = () =>
    startTransition(async () => {
      optimisticListsAct(["UPDATE_PROGRESS", { status, id: item.id }]);
      await incrementProgress(item, (item.progress ?? 0) + 1);
    });
  const cancelRewatch = () =>
    startTransition(async () => {
      const format = item.media?.format ?? MediaFormat.Ova;
      optimisticListsAct([
        "CANCEL_REWATCH",
        {
          id: item.id,
          newStatus:
            format === MediaFormat.Tv
              ? "completed/tv"
              : format === MediaFormat.Movie
                ? "completed/movies"
                : "completed/others",
        },
      ]);
      await cancelRewatchAction(item);
    });
  const remove = () =>
    startTransition(async () => {
      optimisticListsAct(["REMOVE", { status, id: item.id }]);
      await removeFromList(item);
    });

  const watchedEpisodes = item.progress || 0;
  const totalEpisodes = item.media?.episodes;
  const season =
    item.media?.season && item.media.seasonYear
      ? `${convertSeason(item.media.season)} ${item.media.seasonYear}`
      : "Season N/A";
  switch (status) {
    case "watching":
      return (
        <BottomPartTemplate
          text={
            <span className={cn(checkProgressBehind(item) && "text-yellow")}>
              Progress: {watchedEpisodes}/{totalEpisodes ?? "unknown"}
            </span>
          }
        >
          <Button variants={{ size: "icon-sm" }} onClick={increment}>
            <ChevronsRight />
          </Button>
          <Button variants={{ size: "icon-sm" }} onClick={setAsPaused}>
            <Pause />
          </Button>
          <Button variants={{ size: "icon-sm" }} onClick={setAsDropped}>
            <X />
          </Button>
        </BottomPartTemplate>
      );
    case "rewatching":
      return (
        <BottomPartTemplate text={`Progress: ${watchedEpisodes}/${totalEpisodes ?? "unknown"}`}>
          <Button variants={{ size: "icon-sm" }} onClick={increment}>
            <ChevronsRight />
          </Button>
          <Button variants={{ size: "icon-sm" }} onClick={cancelRewatch}>
            <StopCircle />
          </Button>
        </BottomPartTemplate>
      );
    case "completed/tv":
    case "completed/movies":
      return (
        <BottomPartTemplate text={`Score: ${item.score || "unknown"}`}>
          <Button variants={{ size: "icon-sm" }} onClick={setAsRewatching}>
            <Repeat />
          </Button>
          <UpdateItemScore item={item} status={status} />
        </BottomPartTemplate>
      );
    case "completed/others":
      return (
        <BottomPartTemplate text={season}>
          <Button variants={{ size: "icon-sm" }} onClick={setAsRewatching}>
            <Repeat />
          </Button>
        </BottomPartTemplate>
      );
    case "paused":
      return (
        <BottomPartTemplate text={`Progress: ${watchedEpisodes}/${totalEpisodes ?? "unknown"}`}>
          <Button variants={{ size: "icon-sm" }} onClick={setAsWatching}>
            <Play />
          </Button>
        </BottomPartTemplate>
      );
    case "dropped":
      return (
        <BottomPartTemplate text={`Progress: ${watchedEpisodes}/${totalEpisodes ?? "unknown"}`}>
          <Button variants={{ size: "icon-sm" }} onClick={setAsWatching}>
            <Repeat />
          </Button>
        </BottomPartTemplate>
      );
    case "planning":
      return (
        <BottomPartTemplate text={season}>
          <Button variants={{ size: "icon-sm" }} onClick={setAsWatching}>
            <Play />
          </Button>
          <Button variants={{ size: "icon-sm" }} onClick={remove}>
            <Trash />
          </Button>
        </BottomPartTemplate>
      );
  }
}

export function Card({ item, status }: { item: AnimeListItem; status: AnimeListItemStatus }) {
  return (
    <ListItem>
      <div className={cn("flex w-full flex-col gap-1.5", item.pending && "opacity-50")}>
        <div className="truncate">{getTitle(item.media?.title)}</div>
        <BottomPart item={item} status={status} />
      </div>
    </ListItem>
  );
}
