"use client";

import { RotateCcw } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { useTransitionWithNProgress } from "~/lib/hooks/use-transition-with-nprogress";

import { refreshIrasuto } from "./refresh-action";

export function RefreshButton() {
  const startTransition = useTransitionWithNProgress();
  const refresh = () => startTransition(refreshIrasuto);
  return (
    <Button onClick={refresh}>
      <RotateCcw /> Force-refresh
    </Button>
  );
}
