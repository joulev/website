import type { Metadata } from "next";

import { Title } from "~/components/title";
import { Card } from "~/components/ui/card";

import { NavigateButton } from "./navigate-button";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container">
      <Card className="flex flex-col p-0">
        <div className="bg-bg-darker py-6">
          <div className="container flex max-w-screen-md flex-col gap-6">
            <Title
              title="irasuto"
              titleLabel={<span className="text-base text-text-tertiary">イラスト</span>}
              subtitle="This is where I store my collection of some of the most gorgeous illustrations related to Japanese popular culture that I’ve found on Twitter. Enjoy :)"
            />
            <NavigateButton />
          </div>
        </div>
        {children}
      </Card>
    </main>
  );
}

export const metadata: Metadata = {
  title: "joulev.dev » irasuto",
  description: "My collection of illustrations",
  openGraph: {
    title: "joulev.dev » irasuto",
    description: "My collection of illustrations",
    url: "/apps/irasuto",
  },
};
