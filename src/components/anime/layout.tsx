import {
  Calendar,
  CheckCircle,
  Film,
  PauseCircle,
  PlayCircle,
  PlusCircle,
  Repeat,
  Tv2,
  XCircle,
} from "lucide-react";

import { Card } from "~/components/ui/card";
import { getAllLists } from "~/lib/anime/get-lists";

import { Sidebar } from "./sidebar";

function getNavbarItems(
  lists: Awaited<ReturnType<typeof getAllLists>>,
  isAdmin: boolean | undefined,
) {
  return [
    { icon: <PlayCircle />, status: "watching", count: lists.watching.length },
    { icon: <Repeat />, status: "rewatching", count: lists.rewatching.length },
    { icon: <Tv2 />, status: "completed/tv", count: lists.completedTV.length },
    { icon: <Film />, status: "completed/movies", count: lists.completedMovies.length },
    { icon: <CheckCircle />, status: "completed/others", count: lists.completedOthers.length },
    { icon: <PauseCircle />, status: "paused", count: lists.paused.length },
    { icon: <XCircle />, status: "dropped", count: lists.dropped.length },
    { icon: <Calendar />, status: "planning", count: lists.planning.length },
    ...(isAdmin ? [{ icon: <PlusCircle />, status: "add-to-ptw" }] : []),
  ];
}

export async function AnimeLayout({
  isAdmin,
  children,
}: {
  isAdmin?: boolean;
  children: React.ReactNode;
}) {
  const lists = await getAllLists();
  const navbarItems = getNavbarItems(lists, isAdmin);
  return (
    <main className="container max-w-screen-lg">
      <Card className="flex flex-col items-stretch p-0 md:flex-row">
        <Sidebar isAdmin={isAdmin} items={navbarItems} />
        <div className="mx-auto w-full max-w-lg p-6">{children}</div>
      </Card>
    </main>
  );
}
