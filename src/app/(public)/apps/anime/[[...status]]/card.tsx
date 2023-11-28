import Image from "next/image";

import { Score } from "~/components/anime/score";
import { Link } from "~/components/ui/link";
import { ListItem } from "~/components/ui/lists";
import { Progress } from "~/components/ui/progress";
import type { AnimeCardVariant, AnimeListItem } from "~/lib/anime/get-lists";
import { convertSeason, getTitle } from "~/lib/anime/utils";

function BottomPart({ item, variant }: { item: AnimeListItem; variant: AnimeCardVariant }) {
  switch (variant) {
    case "watching":
    case "rewatching":
    case "paused":
    case "dropped": {
      const watchedEpisodes = item.progress || 0;
      const totalEpisodes = item.media?.episodes;
      return (
        <div className="flex flex-col gap-1.5">
          <div className="text-sm text-text-secondary">
            Episode progress: {watchedEpisodes}/{totalEpisodes ?? "unknown"}
          </div>
          <Progress value={totalEpisodes ? watchedEpisodes / totalEpisodes : 1} />
        </div>
      );
    }
    case "completed":
      return (
        <div className="flex flex-row items-center divide-x divide-separator">
          <Score score={item.score} />
          {item.repeat ? (
            <div
              className="pl-3 text-sm text-text-secondary"
              title={`I watched this anime ${item.repeat + 1} times`}
            >
              &times;{item.repeat + 1}
            </div>
          ) : null}
        </div>
      );
    case "completed-others":
    case "planning":
      return (
        <div className="text-sm text-text-secondary">
          {item.media?.season && item.media.seasonYear
            ? `${convertSeason(item.media.season)} ${item.media.seasonYear}`
            : "Season N/A"}
        </div>
      );
  }
}

export function Card({ item, variant }: { item: AnimeListItem; variant: AnimeCardVariant }) {
  return (
    <ListItem asChild>
      <Link href={`https://anilist.co/anime/${item.mediaId}`} unstyled>
        <div className="flex w-full flex-row gap-6">
          {/* min-w-0 is required here for truncating to work */}
          <div className="flex min-w-0 flex-grow flex-col justify-between gap-3">
            <div className="truncate">{getTitle(item.media?.title)}</div>
            <BottomPart item={item} variant={variant} />
          </div>
          {item.media?.coverImage?.medium ? (
            <div className="relative hidden min-h-[64px] w-12 shrink-0 overflow-clip rounded-[0.5rem] sm:block">
              <Image
                src={item.media.coverImage.medium}
                alt="cover"
                fill
                className="object-cover"
                sizes="(min-width: 640px) 48px, 0px"
              />
            </div>
          ) : (
            <div className="bg-daw-main-200 hidden min-h-[96px] w-18 shrink-0 rounded sm:block" />
          )}
        </div>
      </Link>
    </ListItem>
  );
}
