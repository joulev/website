import Image from "next/image";

import { Link } from "~/components/ui/link";
import { ListItem } from "~/components/ui/lists";
import { Progress } from "~/components/ui/progress";

import type { AnimeListItem } from "../get-lists";
import { convertSeason, getTitle } from "../utils";

export type CardVariant =
  | "watching"
  | "rewatching"
  | "completed"
  | "completed-others"
  | "paused"
  | "dropped"
  | "planning";

function Score({ score }: { score: number }) {
  const d2r = (degree: number) => (degree * Math.PI) / 180;
  const sin = (degree: number) => Math.sin(d2r(degree));
  const cos = (degree: number) => Math.cos(d2r(degree));

  const center = 12;
  const width = 4;

  const f = (x: number) => 65.8656 * Math.pow(1.2035, x) - 60.8656; // f(0) = 5, f(7) = 180, f(10) ≈ 359
  const angle = f(score);

  const radius = center - width / 2;
  const start = [center, width / 2];
  const end0 = center + radius * sin(angle);
  const end1 = center - radius * cos(angle);
  const largeArcFlag = angle > 180 ? 1 : 0;

  const pathString = `M ${start[0]} ${start[1]} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end0} ${end1}`;

  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
      <circle cx={center} cy={center} r={radius} className="stroke-bg-idle" strokeWidth={width} />
      <path
        className="stroke-text-secondary"
        strokeWidth={width}
        strokeLinecap="round"
        d={pathString}
      />
    </svg>
  );
}

function BottomPart({ item, variant }: { item: AnimeListItem; variant: CardVariant }) {
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
          <div className="flex flex-row items-center gap-1.5 pr-3">
            <Score score={item.score ?? 0} />
            <div className="text-sm">{item.score ?? "N/A"}</div>
          </div>
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

export function Card({ item, variant }: { item: AnimeListItem; variant: CardVariant }) {
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