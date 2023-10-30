import Image from "next/image";

import { Link } from "~/components/ui/link";
import { ListItem } from "~/components/ui/lists";

import type { AnimeListItem } from "../get-lists";
import { getTitle } from "../utils";

export type CardVariant =
  | "watching"
  | "rewatching"
  | "completed"
  | "completed-others"
  | "paused"
  | "dropped"
  | "planning";

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- temporarily unused
export function Card({ item, variant }: { item: AnimeListItem; variant: CardVariant }) {
  return (
    <ListItem asChild>
      <Link
        href={`https://anilist.co/anime/${item.mediaId}`}
        unstyled
        className="flex flex-row gap-6 !pr-4"
      >
        <div className="flex-grow">{getTitle(item.media?.title)}</div>
        {item.media?.coverImage?.medium ? (
          <div className="relative hidden min-h-[80px] w-16 shrink-0 overflow-hidden rounded-[0.5rem] sm:block">
            <Image
              src={item.media.coverImage.medium}
              alt="cover"
              fill
              className="object-cover"
              sizes="(min-width: 640px) 64px, 0px"
            />
          </div>
        ) : (
          <div className="bg-daw-main-200 hidden min-h-[96px] w-18 shrink-0 rounded sm:block" />
        )}
      </Link>
    </ListItem>
  );
}
