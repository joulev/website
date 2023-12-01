import { Title } from "~/components/title";
import { Card } from "~/components/ui/card";

import { Editor } from "./editor";

export default function Page() {
  return (
    <main className="container max-w-screen-md">
      <Card className="flex flex-col p-0">
        <div className="bg-bg-darker py-6">
          <div className="container flex max-w-screen-md flex-col gap-6">
            <Title title="snippets" subtitle="Upload short code snippets here." />
          </div>
        </div>
        <Editor />
      </Card>
    </main>
  );
}
