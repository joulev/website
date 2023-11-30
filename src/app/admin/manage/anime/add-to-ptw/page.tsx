import { EmptyState } from "~/components/anime/empty-state";
import { Score } from "~/components/anime/score";
import { Link } from "~/components/ui/link";
import { List, ListContent, ListItem } from "~/components/ui/lists";
import { getAllLists } from "~/lib/anime/get-lists";
import { SEARCH_ANIME } from "~/lib/anime/queries";
import { convertSeason, getTitle } from "~/lib/anime/utils";
import { getAuthenticatedGraphQLClient } from "~/lib/auth/helpers";

import type { PageProps } from "./$types";
import { ActionButtons } from "./action-buttons";
import { SearchForm } from "./search-form";

async function search(query: string | undefined) {
  if (!query) return [];
  const client = await getAuthenticatedGraphQLClient();
  const { lists } = await getAllLists();
  const allIds = lists
    .map(list => list?.entries)
    .flat()
    .map(entry => entry?.mediaId ?? 0);
  const data = await client.request(SEARCH_ANIME, { search: query, idNotIn: allIds });
  const items = data.Page?.media ?? [];
  return items;
}

export default async function Page({ searchParams }: PageProps) {
  const query = Array.isArray(searchParams.s) ? searchParams.s[0] : searchParams.s;
  const items = await search(query);
  return (
    <div className="flex flex-col gap-6">
      <SearchForm query={query} />
      {!query && <EmptyState>Search for an anime to add to your PTW list.</EmptyState>}
      {query && items.length === 0 ? (
        <EmptyState>
          No results found for <strong>{query}</strong>.
        </EmptyState>
      ) : null}
      {items.length > 0 && (
        <List>
          <ListContent>
            {items.map(item =>
              item ? (
                <ListItem asChild key={item.id}>
                  <Link href={`https://anilist.co/anime/${item.id}`} unstyled>
                    <div className="flex w-full flex-col gap-1.5">
                      <div className="truncate">{getTitle(item.title)}</div>
                      <div className="flex flex-row flex-wrap items-end gap-x-3">
                        <div className="flex flex-grow flex-row items-center divide-x divide-separator text-sm text-text-secondary">
                          <Score
                            score={item.meanScore ? item.meanScore / 10 : undefined}
                            className="pr-3"
                          />
                          <div className="hidden pl-3 sm:block">
                            {/* eslint-disable-next-line no-nested-ternary -- It's fine */}
                            {item.genres && item.genres.length > 0 ? (
                              <>{item.genres.slice(0, 3).join(", ")}</>
                            ) : item.season && item.seasonYear ? (
                              `${convertSeason(item.season)} ${item.seasonYear}`
                            ) : (
                              "Season N/A"
                            )}
                          </div>
                        </div>
                        <ActionButtons id={item.id} />
                      </div>
                    </div>
                  </Link>
                </ListItem>
              ) : null,
            )}
          </ListContent>
        </List>
      )}
    </div>
  );
}
