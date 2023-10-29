"use client";

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
          <SidebarSectionItem key="slug" active={`/apps/anime${slug}` === pathname} asChild>
            <Link href={`/apps/anime${slug}`} unstyled>
              {icon}
              <SidebarSectionItemName>{content}</SidebarSectionItemName>
              <SidebarSectionItemCounter>{count}</SidebarSectionItemCounter>
            </Link>
          </SidebarSectionItem>
        ))}
      </SidebarSectionItems>
    </SidebarSection>
  );
}

export function Sidebar({ items }: { items: Item[] }) {
  return (
    <div className="border-b border-separator bg-bg-darker md:w-64 md:shrink-0 md:border-r">
      <div className="p-6">
        <Title title="anime" subtitle="My anime list" />
      </div>
      <Navigation items={items} />
    </div>
  );
}
