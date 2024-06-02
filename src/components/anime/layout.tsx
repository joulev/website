import { Card } from "~/components/ui/card";
import { getAllLists } from "~/lib/anime/get-lists";

import { AnimeDataContextProvider } from "./data-context";
import { Sidebar } from "./sidebar";

export async function AnimeLayout({
  isAdmin,
  children,
}: {
  isAdmin?: boolean;
  children: React.ReactNode;
}) {
  const lists = await getAllLists();
  return (
    <main className="container max-w-screen-lg">
      <Card className="flex flex-col items-stretch p-0 md:flex-row">
        <AnimeDataContextProvider lists={lists}>
          <Sidebar isAdmin={isAdmin} />
          <div className="mx-auto w-full max-w-lg p-6">{children}</div>
        </AnimeDataContextProvider>
      </Card>
    </main>
  );
}
