import type { Metadata } from "next";

import { Title } from "~/components/title";
import { Card } from "~/components/ui/card";

import { getMetadata } from "~/lib/seo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container max-w-screen-sm">
      <Card className="flex flex-col p-0">
        <div className="bg-bg-darker py-6">
          <div className="container flex max-w-screen-md flex-col gap-6">
            <Title title="link" subtitle="A simple URL shortener. That's it." />
          </div>
        </div>
        {children}
      </Card>
    </main>
  );
}

export const metadata: Metadata = getMetadata({
  title: "joulev.dev » link",
  description: "A simple URL shortener",
  url: "/apps/link",
});
