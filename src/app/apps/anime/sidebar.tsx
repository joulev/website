"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Title } from "~/components/title";
import { Button } from "~/components/ui/button";
import { Link } from "~/components/ui/link";
import {
  SidebarSection,
  SidebarSectionItem,
  SidebarSectionItemCounter,
  SidebarSectionItemName,
  SidebarSectionItems,
} from "~/components/ui/sidebar";

interface Item {
  content: React.ReactNode;
  icon: React.ReactNode;
  slug: string;
  count: number;
}

function Navigation({ items }: { items: Item[] }) {
  const pathname = usePathname();
  return (
    <SidebarSection>
      <SidebarSectionItems>
        {items.map(({ content, icon, slug, count }) => (
          <SidebarSectionItem
            key="slug"
            active={
              `/apps/anime${slug}` === pathname ||
              (slug === "/watching" && pathname === "/apps/anime")
            }
            asChild
          >
            <Link href={`/apps/anime${slug}`} unstyled>
              {icon}
              <SidebarSectionItemName>{content}</SidebarSectionItemName>
              {count > 0 ? <SidebarSectionItemCounter>{count}</SidebarSectionItemCounter> : null}
            </Link>
          </SidebarSectionItem>
        ))}
      </SidebarSectionItems>
    </SidebarSection>
  );
}

export function Sidebar({ items }: { items: Item[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border-b border-separator bg-bg-darker md:w-64 md:shrink-0 md:border-r">
      <div className="flex flex-row items-start justify-between p-6">
        <Title title="anime" subtitle="My anime list" />
        <Button
          className="md:hidden"
          variants={{ variant: "ghost", size: "icon-md" }}
          onClick={() => setExpanded(x => !x)}
        >
          {expanded ? <X /> : <Menu />}
        </Button>
      </div>
      <div
        className="grid grid-rows-[--rows] opacity-[--opacity] transition-all ease-in-out md:grid-rows-[1fr] md:opacity-100"
        style={{ "--rows": expanded ? "1fr" : "0fr", "--opacity": expanded ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <Navigation items={items} />
        </div>
      </div>
    </div>
  );
}
