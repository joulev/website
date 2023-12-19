import type { Metadata } from "next";

import { Title } from "~/components/title";
import { Card } from "~/components/ui/card";

import { Form } from "./form";

export default function Page() {
  return (
    <main className="container max-w-screen-sm">
      <Card className="flex flex-col p-0">
        <div className="bg-bg-darker py-6">
          <div className="container flex max-w-screen-md flex-col gap-6">
            <Title
              title="live-reaction"
              subtitle="Generate live reaction stickers from Discord emotes"
            />
          </div>
        </div>
        <Form />
      </Card>
    </main>
  );
}

export const metadata: Metadata = {
  title: "joulev.dev » live-reaction",
  description: "Generate live reaction stickers from Discord emotes",
  openGraph: {
    title: "joulev.dev » live-reaction",
    description: "Generate live reaction stickers from Discord emotes",
    url: "/apps/live-reaction",
  },
};
