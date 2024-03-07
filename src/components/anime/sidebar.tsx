"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Menu, X } from "~/components/icons";
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
import { forceRefresh } from "~/lib/anime/actions";
import { getListTitleFromStatus } from "~/lib/anime/utils";
import { useTransitionWithNProgress } from "~/lib/hooks/use-transition-with-nprogress";

interface Item {
  icon: React.ReactNode;
  status: string;
  count?: number;
}

function Navigation({ basePath, items }: { basePath: string; items: Item[] }) {
  const pathname = usePathname();
  const startTransition = useTransitionWithNProgress();
  const refresh = () => startTransition(forceRefresh);
  return (
    <SidebarSection>
      <SidebarSectionItems>
        {items.map(({ icon, status, count }) => {
          if (status === "add-to-ptw") {
            return (
              <SidebarSectionItem
                key={status}
                active={`${basePath}/${status}` === pathname}
                asChild
              >
                <Link href={`${basePath}/${status}`} unstyled>
                  {icon}
                  <SidebarSectionItemName>Add to PTW</SidebarSectionItemName>
                </Link>
              </SidebarSectionItem>
            );
          }
          if (status === "refresh") {
            return (
              <SidebarSectionItem key={status} asChild>
                <button type="button" className="text-left" onClick={refresh}>
                  {icon}
                  <SidebarSectionItemName>Force-refresh</SidebarSectionItemName>
                </button>
              </SidebarSectionItem>
            );
          }
          return (
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
                <SidebarSectionItemName>{getListTitleFromStatus(status)}</SidebarSectionItemName>
                {count ? <SidebarSectionItemCounter>{count}</SidebarSectionItemCounter> : null}
              </Link>
            </SidebarSectionItem>
          );
        })}
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
    normalisedPathname;
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
