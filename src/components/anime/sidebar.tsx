"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
import { getListTitleFromStatus } from "~/lib/anime/utils";

interface Item {
  icon: React.ReactNode;
  status: string;
  count?: number;
}

function Navigation({ basePath, items }: { basePath: string; items: Item[] }) {
  const pathname = usePathname();
  return (
    <SidebarSection>
      <SidebarSectionItems>
        {items.map(({ icon, status, count }) => (
          <SidebarSectionItem
            key={status}
            active={
              `${basePath}/${status}` === pathname ||
              (status === "watching" && pathname === basePath)
            }
            asChild
          >
            <Link href={`${basePath}/${status}`} unstyled>
              {icon}
              <SidebarSectionItemName>
                {status === "add-to-ptw" ? "Add to PTW" : getListTitleFromStatus(status)}
              </SidebarSectionItemName>
              {count ? <SidebarSectionItemCounter>{count}</SidebarSectionItemCounter> : null}
            </Link>
          </SidebarSectionItem>
        ))}
      </SidebarSectionItems>
    </SidebarSection>
  );
}

export function Sidebar({ isAdmin, items }: { isAdmin?: boolean; items: Item[] }) {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();
  const basePath = isAdmin ? "/admin/manage/anime" : "/apps/anime";
  const normalisedPathname = pathname === basePath ? `${basePath}/watching` : pathname;
  useEffect(() => {
    setExpanded(x => !x);
  }, [normalisedPathname]);
  return (
    <div className="bg-bg-darker md:w-64 md:shrink-0">
      <div className="md:sticky md:top-0">
        <div className="flex flex-row items-start justify-between p-6">
          <Title title="anime" subtitle={isAdmin ? "Manage anime" : "My anime list"} />
          <Button
            className="text-text-secondary hover:text-text-primary md:hidden"
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
            <Navigation basePath={basePath} items={items} />
          </div>
        </div>
      </div>
    </div>
  );
}
