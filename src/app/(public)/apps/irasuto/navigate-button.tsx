"use client";

import { usePathname, useRouter } from "next/navigation";
import { startTransition } from "react";

import { ArrowDownUp, ChevronDown } from "~/components/icons";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export function NavigateButton() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-full sm:w-auto">
          <ArrowDownUp />
          {pathname === "/apps/irasuto" ? "Sorted by newest first" : "Randomised"}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={pathname}
          onValueChange={value => startTransition(() => router.push(value))}
        >
          <DropdownMenuRadioItem value="/apps/irasuto">Newest first</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="/apps/irasuto/random">Randomised</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
