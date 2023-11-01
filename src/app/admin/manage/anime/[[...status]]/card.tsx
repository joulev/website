import { ChevronsRight, Pause, Play, Repeat, StopCircle, Trash, X } from "lucide-react";

import { Button } from "~/components/ui/button";
import { ListItem } from "~/components/ui/lists";
import type { AnimeCardVariant, AnimeListItem } from "~/lib/anime/get-lists";
import { convertSeason, getTitle } from "~/lib/anime/utils";

import { UpdateItemScore } from "./update-item-score";

function BottomPartTemplate({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-row flex-wrap items-end gap-x-3">
      <div className="flex-grow text-sm text-text-secondary">{text}</div>
      <div className="flex flex-row-reverse gap-3">{children}</div>
    </div>
  );
}

function BottomPart({ item, variant }: { item: AnimeListItem; variant: AnimeCardVariant }) {
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
          <Button variants={{ size: "icon-sm" }}>
            <ChevronsRight />
          </Button>
          <Button variants={{ size: "icon-sm" }}>
            <Pause />
          </Button>
          <Button variants={{ size: "icon-sm" }}>
            <X />
          </Button>
        </BottomPartTemplate>
      );
    case "rewatching":
      return (
        <BottomPartTemplate text={`Progress: ${watchedEpisodes}/${totalEpisodes ?? "unknown"}`}>
          <Button variants={{ size: "icon-sm" }}>
            <ChevronsRight />
          </Button>
          <Button variants={{ size: "icon-sm" }}>
            <StopCircle />
          </Button>
        </BottomPartTemplate>
      );
    case "completed":
      return (
        <BottomPartTemplate text={`Score: ${item.score || "unknown"}`}>
          <Button variants={{ size: "icon-sm" }}>
            <Repeat />
          </Button>
          <UpdateItemScore item={item} />
        </BottomPartTemplate>
      );
    case "completed-others":
      return (
        <BottomPartTemplate text={season}>
          <Button variants={{ size: "icon-sm" }}>
            <Repeat />
          </Button>
        </BottomPartTemplate>
      );
    case "paused":
      return (
        <BottomPartTemplate text={`Progress: ${watchedEpisodes}/${totalEpisodes ?? "unknown"}`}>
          <Button variants={{ size: "icon-sm" }}>
            <Play />
          </Button>
        </BottomPartTemplate>
      );
    case "dropped":
      return (
        <BottomPartTemplate text={`Progress: ${watchedEpisodes}/${totalEpisodes ?? "unknown"}`}>
          <Button variants={{ size: "icon-sm" }}>
            <Repeat />
          </Button>
        </BottomPartTemplate>
      );
    case "planning":
      return (
        <BottomPartTemplate text={season}>
          <Button variants={{ size: "icon-sm" }}>
            <Play />
          </Button>
          <Button variants={{ size: "icon-sm" }}>
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
