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

import { Title } from "~/components/title";
import { Card } from "~/components/ui/card";
import {
  SidebarSection,
  SidebarSectionItem,
  SidebarSectionItemCounter,
  SidebarSectionItemName,
  SidebarSectionItems,
} from "~/components/ui/sidebar";

function Navigation() {
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
  return (
    <SidebarSection>
      <SidebarSectionItems>
        {items.map(({ content, icon: Icon, count }) => (
          <SidebarSectionItem key="slug">
            <Icon />
            <SidebarSectionItemName>{content}</SidebarSectionItemName>
            <SidebarSectionItemCounter>{count}</SidebarSectionItemCounter>
          </SidebarSectionItem>
        ))}
      </SidebarSectionItems>
    </SidebarSection>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container max-w-screen-lg">
      <Card className="flex flex-col p-0 md:flex-row">
        <div className="border-b border-separator bg-bg-darker md:w-64 md:shrink-0 md:border-r">
          <div className="p-6">
            <Title title="anime" subtitle="My anime list" />
          </div>
          <Navigation />
        </div>
        <div className="flex max-w-full flex-grow flex-col divide-y divide-separator overflow-x-auto">
          {children}
        </div>
      </Card>
    </main>
  );
}
