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
import { db } from "~/lib/db";
import { dailyMoods } from "~/lib/db/schema";

import { MoodForm } from "./mood-form";

const getHistoricalMoods = cache(() => db.select().from(dailyMoods), [], { tags: ["daily-moods"] });

function renderDate(date: Date | string) {
  const formatter = new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "long" });
  return formatter.format(new Date(date));
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
                        <button type="button" className="flex flex-row justify-between">
                          <span>{renderedDate}</span>
                          <span>{mood.mood}</span>
                        </button>
                      </ListItem>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>{renderedDate}</DialogTitle>
                      </DialogHeader>
                      <div className="prose max-w-full">
                        <Markdown remarkPlugins={[remarkGfm]}>{mood.comment}</Markdown>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button className="w-full sm:w-auto" variants={{ variant: "primary" }}>
                            Cancel
                          </Button>
                        </DialogClose>
                      </DialogFooter>
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
