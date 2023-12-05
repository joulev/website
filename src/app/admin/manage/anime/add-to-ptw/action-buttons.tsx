"use client";

import { ExternalLink, Plus } from "lucide-react";

import { Button, LinkButton } from "~/components/ui/button";
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
      <LinkButton variants={{ size: "icon-sm" }} href={`https://anilist.co/anime/${id}`}>
        <ExternalLink />
      </LinkButton>
    </div>
  );
}
