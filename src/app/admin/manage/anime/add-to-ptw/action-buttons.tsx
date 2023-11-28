"use client";

import { Plus } from "lucide-react";

import { Button } from "~/components/ui/button";
import { addToPTW } from "~/lib/anime/actions";
import { useTransitionWithNProgress } from "~/lib/hooks/use-transition-with-nprogress";

export function ActionButtons({ id }: { id: number }) {
  const startTransition = useTransitionWithNProgress();
  const add = () => startTransition(() => addToPTW(id));
  return (
    <div className="flex flex-row-reverse gap-3">
      <Button variants={{ size: "icon-sm" }} onClick={add}>
        <Plus />
      </Button>
    </div>
  );
}
