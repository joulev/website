"use client";

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
import { usePathname } from "next/navigation";

import { Title } from "~/components/title";
import { Link } from "~/components/ui/link";
import {
  SidebarSection,
  SidebarSectionItem,
  SidebarSectionItemCounter,
  SidebarSectionItemName,
  SidebarSectionItems,
} from "~/components/ui/sidebar";

const items = [
  { content: "Watching", icon: PlayCircle, slug: "/watching", count: 0 },
  { content: "Rewatching", icon: Repeat, slug: "/rewatching", count: 0 },
  { content: "Completed TV", icon: Tv2, slug: "/completed/tv", count: 0 },
  {
    content: "Completed Movies",
    icon: Film,
    slug: "/completed/movies",
    count: 0,
  },
  {
    content: "Completed (others)",
    icon: CheckCircle,
    slug: "/completed/others",
    count: 0,
  },
  { content: "Paused", icon: PauseCircle, slug: "/paused", count: 0 },
  { content: "Dropped", icon: XCircle, slug: "/dropped", count: 0 },
  { content: "Planning", icon: Calendar, slug: "/planning", count: 0 },
];

function Navigation() {
  const pathname = usePathname();
  return (
    <SidebarSection>
      <SidebarSectionItems>
        {items.map(({ content, icon: Icon, slug, count }) => (
          <SidebarSectionItem key="slug" active={`/apps/anime${slug}` === pathname} asChild>
            <Link href={`/apps/anime${slug}`} unstyled>
              <Icon />
              <SidebarSectionItemName>{content}</SidebarSectionItemName>
              <SidebarSectionItemCounter>{count}</SidebarSectionItemCounter>
            </Link>
          </SidebarSectionItem>
        ))}
      </SidebarSectionItems>
    </SidebarSection>
  );
}

export function Sidebar() {
  return (
    <div className="border-b border-separator bg-bg-darker md:w-64 md:shrink-0 md:border-r">
      <div className="p-6">
        <Title title="anime" subtitle="My anime list" />
      </div>
      <Navigation />
    </div>
  );
}
