import { notFound } from "next/navigation";

import { List, ListContent, ListHeader } from "~/components/ui/lists";
import { type AnimeCardVariant, type AnimeListItem, getList } from "~/lib/anime/get-lists";
import { getListTitleFromStatus } from "~/lib/anime/utils";

export async function AnimePageContent({
  status: rawStatus,
  card: Card,
}: {
  status: string[] | undefined;
  card: React.FC<{ item: AnimeListItem; variant: AnimeCardVariant }>;
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

  const [list, variant] = await getList(status);
  if (list.length === 0)
    return (
      <div className="px-6 py-12 text-center text-text-secondary">
        No entries. Check back later.
      </div>
    );
  return (
    <List>
      <ListHeader>{getListTitleFromStatus(status)}</ListHeader>
      <ListContent>
        {list.map(item => (
          <Card key={item.id} item={item} variant={variant} />
        ))}
      </ListContent>
    </List>
  );
}
