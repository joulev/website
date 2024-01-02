import { unstable_cache as cache } from "next/cache";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { List, ListContent, ListHeader, ListItem } from "~/components/ui/lists";
import { ScrollArea } from "~/components/ui/scroll-area";
import { cn } from "~/lib/cn";
import { db } from "~/lib/db";
import { type Mood, dailyMoods } from "~/lib/db/schema";

import { MoodForm } from "./mood-form";

const getHistoricalMoods = cache(() => db.select().from(dailyMoods), [], { tags: ["daily-moods"] });

function renderDate(date: Date | string) {
  const formatter = new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "long" });
  return formatter.format(new Date(date));
}

function getMoodClass(mood: Mood) {
  switch (mood) {
    case "horrible":
      return "bg-red";
    case "bad":
      return "bg-orange";
    case "meh":
      return "bg-yellow";
    case "good":
      return "bg-green";
    case "wonderful":
      return "bg-mint";
  }
}

export default async function Page() {
  const moods = await getHistoricalMoods();
  return (
    <main className="container max-w-screen-md">
      <Card className="flex flex-col divide-separator p-0 max-sm:divide-y sm:grid sm:grid-cols-2 sm:divide-x">
        <MoodForm />
        <div className="p-6">
          <List>
            <ListHeader>History</ListHeader>
            <ListContent>
              {moods.map(mood => {
                const renderedDate = renderDate(mood.date);
                return (
                  <Dialog key={renderedDate}>
                    <DialogTrigger asChild>
                      <ListItem asChild>
                        <button
                          type="button"
                          className="flex flex-row items-center justify-between"
                        >
                          <span>{renderedDate}</span>
                          <span
                            className={cn(getMoodClass(mood.mood), "size-6 shrink-0 rounded-full")}
                          />
                        </button>
                      </ListItem>
                    </DialogTrigger>
                    <DialogContent className="p-0 sm:max-w-screen-sm">
                      <div className="flex flex-col gap-6 py-6 *:px-6">
                        <DialogHeader>
                          <DialogTitle>
                            <span className="inline-flex flex-row items-center gap-3">
                              <span
                                className={cn(
                                  getMoodClass(mood.mood),
                                  "size-6 shrink-0 rounded-full",
                                )}
                              />
                              <span>{renderedDate}</span>
                            </span>
                          </DialogTitle>
                        </DialogHeader>
                        <ScrollArea className="max-h-[60vh] overflow-y-auto">
                          <div className="prose max-w-full">
                            <Markdown remarkPlugins={[remarkGfm]}>{mood.comment}</Markdown>
                          </div>
                        </ScrollArea>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button className="w-full sm:w-auto">Cancel</Button>
                          </DialogClose>
                        </DialogFooter>
                      </div>
                    </DialogContent>
                  </Dialog>
                );
              })}
            </ListContent>
          </List>
        </div>
      </Card>
    </main>
  );
}
