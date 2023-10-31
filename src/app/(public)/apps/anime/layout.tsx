import {
  Calendar,
  CheckCircle,
  Film,
  PauseCircle,
  PlayCircle,
  Repeat,
  Tv2,
  XCircle,
} from "lucide-react";
import type { Metadata } from "next";

import { Card } from "~/components/ui/card";

import { getLists } from "./get-lists";
import { Sidebar } from "./sidebar";

function getNavbarItems(lists: Awaited<ReturnType<typeof getLists>>) {
  return [
    { icon: <PlayCircle />, status: "watching", count: lists.watching.length },
    { icon: <Repeat />, status: "rewatching", count: lists.rewatching.length },
    { icon: <Tv2 />, status: "completed/tv", count: lists.completedTV.length },
    { icon: <Film />, status: "completed/movies", count: lists.completedMovies.length },
    { icon: <CheckCircle />, status: "completed/others", count: lists.completedOthers.length },
    { icon: <PauseCircle />, status: "paused", count: lists.paused.length },
    { icon: <XCircle />, status: "dropped", count: lists.dropped.length },
    { icon: <Calendar />, status: "planning", count: lists.planning.length },
  ];
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const lists = await getLists();
  const navbarItems = getNavbarItems(lists);
  return (
    <main className="container max-w-screen-lg">
      <Card className="flex flex-col items-stretch p-0 md:flex-row">
        <Sidebar items={navbarItems} />
        <div className="mx-auto w-full max-w-lg p-6">{children}</div>
      </Card>
    </main>
  );
}

export const metadata: Metadata = {
  title: {
    template: "%s – joulev » anime",
    default: "joulev » anime",
  },
  description: "joulev's anime list",
  openGraph: {
    title: "joulev.dev » anime",
    description: "joulev's anime list",
    url: "/apps/anime",
  },
};
