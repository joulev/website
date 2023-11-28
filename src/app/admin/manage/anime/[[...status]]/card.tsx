"use client";

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
} from "lucide-react";
import { useState } from "react";

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
  updateStatus,
} from "~/lib/anime/actions";
import type { AnimeCardVariant, AnimeListItem } from "~/lib/anime/get-lists";
import { constraintScore, convertSeason, getAccumulatedScore, getTitle } from "~/lib/anime/utils";
import { cn } from "~/lib/cn";
import { MediaListStatus } from "~/lib/gql/graphql";
import { useTransitionWithNProgress } from "~/lib/hooks/use-transition-with-nprogress";

function BottomPartTemplate({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-row flex-wrap items-end gap-x-3">
      <div className="flex-grow text-sm text-text-secondary">{text}</div>
      <div className="flex flex-row-reverse gap-3">{children}</div>
    </div>
  );
}

const icons = [Enjoyment, Story, Character, Animation, Music];
const keys = ["Enjoyment", "Story", "Characters", "Animation", "Music"] as const;

function UpdateItemScore({ item }: { item: AnimeListItem }) {
  const advancedScores = item.advancedScores as Record<(typeof keys)[number], string | undefined>;
  const originalScoresStr = keys.map(key => String(advancedScores[key] ?? "0"));
  const [scoresStr, setScoresStr] = useState(originalScoresStr);
  const scores = scoresStr.map(score => constraintScore(Number(score)));
  const accumulate = getAccumulatedScore(scores);

  return (
    <Dialog onOpenChange={isOpen => isOpen || setScoresStr(originalScoresStr)}>
      <DialogTrigger asChild>
        <Button variants={{ size: "icon-sm" }}>
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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
          <Button className="w-full sm:w-auto" variants={{ variant: "primary" }}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function BottomPart({ item, variant }: { item: AnimeListItem; variant: AnimeCardVariant }) {
  const startTransition = useTransitionWithNProgress();

  const setAsWatching = () => startTransition(() => updateStatus(item, MediaListStatus.Current));
  const setAsRewatching = () =>
    startTransition(() => updateStatus(item, MediaListStatus.Repeating));
  const setAsPaused = () => startTransition(() => updateStatus(item, MediaListStatus.Paused));
  const setAsDropped = () => startTransition(() => updateStatus(item, MediaListStatus.Dropped));
  const increment = () => startTransition(() => incrementProgress(item));
  const cancelRewatch = () => startTransition(() => cancelRewatchAction(item));
  const remove = () => startTransition(() => removeFromList(item));

  const watchedEpisodes = item.progress || 0;
  const totalEpisodes = item.media?.episodes;
  const season =
    item.media?.season && item.media.seasonYear
      ? `${convertSeason(item.media.season)} ${item.media.seasonYear}`
      : "Season N/A";
  switch (variant) {
    case "watching":
      return (
        <BottomPartTemplate text={`Progress: ${watchedEpisodes}/${totalEpisodes ?? "unknown"}`}>
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
    case "completed":
      return (
        <BottomPartTemplate text={`Score: ${item.score || "unknown"}`}>
          <Button variants={{ size: "icon-sm" }} onClick={setAsRewatching}>
            <Repeat />
          </Button>
          <UpdateItemScore item={item} />
        </BottomPartTemplate>
      );
    case "completed-others":
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
          <Button variants={{ size: "icon-sm" }} onClick={remove}>
            <Play />
          </Button>
          <Button variants={{ size: "icon-sm" }} onClick={setAsRewatching}>
            <Trash />
          </Button>
        </BottomPartTemplate>
      );
  }
}

export function Card({ item, variant }: { item: AnimeListItem; variant: AnimeCardVariant }) {
  return (
    <ListItem>
      <div className="flex w-full flex-col gap-1.5">
        <div className="truncate">{getTitle(item.media?.title)}</div>
        <BottomPart item={item} variant={variant} />
      </div>
    </ListItem>
  );
}
