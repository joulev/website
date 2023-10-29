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
    {
      content: "Watching",
      icon: <PlayCircle />,
      slug: "/watching",
      count: lists.watching.length,
    },
    {
      content: "Rewatching",
      icon: <Repeat />,
      slug: "/rewatching",
      count: lists.rewatching.length,
    },
    {
      content: "Completed TV",
      icon: <Tv2 />,
      slug: "/completed/tv",
      count: lists.completedTV.length,
    },
    {
      content: "Completed Movies",
      icon: <Film />,
      slug: "/completed/movies",
      count: lists.completedMovies.length,
    },
    {
      content: "Completed (others)",
      icon: <CheckCircle />,
      slug: "/completed/others",
      count: lists.completedOthers.length,
    },
    {
      content: "Paused",
      icon: <PauseCircle />,
      slug: "/paused",
      count: lists.paused.length,
    },
    {
      content: "Dropped",
      icon: <XCircle />,
      slug: "/dropped",
      count: lists.dropped.length,
    },
    {
      content: "Planning",
      icon: <Calendar />,
      slug: "/planning",
      count: lists.planning.length,
    },
  ];
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const lists = await getLists();
  const navbarItems = getNavbarItems(lists);
  return (
    <main className="container max-w-screen-lg">
      <Card className="flex flex-col items-stretch p-0 md:flex-row">
        <Sidebar items={navbarItems} />
        <div className="flex max-w-full flex-grow flex-col divide-y divide-separator overflow-x-auto">
          {children}
        </div>
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
