"use client";

import {
  Move3d as Animation,
  User as Character,
  Smile as Enjoyment,
  Music,
  Pencil,
  AlignJustify as Story,
} from "lucide-react";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import type { AnimeListItem } from "~/lib/anime/get-lists";
import { constraintScore, getAccumulatedScore, getTitle } from "~/lib/anime/utils";
import { cn } from "~/lib/cn";

const icons = [Enjoyment, Story, Character, Animation, Music];
const keys = ["Enjoyment", "Story", "Characters", "Animation", "Music"] as const;

export function UpdateItemScore({ item }: { item: AnimeListItem }) {
  const advancedScores = item.advancedScores as Record<(typeof keys)[number], string | undefined>;
  const originalScoresStr = keys.map(key => String(advancedScores[key] ?? "0"));
  const [scoresStr, setScoresStr] = useState(originalScoresStr);
  const scores = scoresStr.map(score => constraintScore(Number(score)));
  const accumulate = getAccumulatedScore(scores);

  return (
    <Dialog onOpenChange={isOpen => isOpen || setScoresStr(originalScoresStr)}>
      <DialogTrigger asChild>
        <Button variants={{ size: "icon-sm" }}>
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{getTitle(item.media?.title)}</DialogTitle>
          <DialogDescription>Update component scores of this anime</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
          {icons.map((Icon, i) => (
            <div className="flex flex-row items-center gap-3" key={keys[i]}>
              <Icon
                className={cn(
                  "shrink-0 transition",
                  scores[i] !== Number(advancedScores[keys[i]])
                    ? "text-text-primary"
                    : "text-text-secondary",
                )}
              />
              <div className="flex-grow">
                <Input
                  value={scoresStr[i]}
                  onValueChange={value =>
                    setScoresStr([...scoresStr.slice(0, i), value, ...scoresStr.slice(i + 1)])
                  }
                />
              </div>
            </div>
          ))}
        </div>
        <div className="recessed rounded bg-bg-darker p-6 text-center text-text-secondary">
          Score: <span className="font-bold text-text-primary">{accumulate}</span>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="w-full sm:w-auto">Cancel</Button>
          </DialogClose>
          <Button className="w-full sm:w-auto" variants={{ variant: "primary" }}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
