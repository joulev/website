import { eq } from "drizzle-orm";
import { ExternalLink, Pen } from "lucide-react";
import { unstable_cache as cache } from "next/cache";

import { CopyButton } from "~/components/copy-button";
import { Title } from "~/components/title";
import { Button, LinkButton } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { db } from "~/lib/db";
import { shortLinks } from "~/lib/db/schema";

const getJoulevLinks = cache(
  () => db.select().from(shortLinks).where(eq(shortLinks.isJoulev, true)),
  [],
  { tags: ["joulev-links"] },
);

export default async function Page() {
  const links = await getJoulevLinks();
  return (
    <main className="container max-w-screen-sm">
      <Card className="flex flex-col p-0">
        <div className="bg-bg-darker p-6">
          <Title title="link" subtitle="Manage personal short links" />
        </div>
        <div className="flex flex-col divide-y divide-separator">
          {links.map(link => (
            <div key={link.slug} className="flex flex-col gap-1.5 p-6">
              <div className="flex flex-row items-baseline gap-3">
                <div className="shrink-0 text-lg font-semibold">{link.slug}</div>
                <div className="truncate text-sm text-text-secondary">{link.url}</div>
              </div>
              <div className="flex flex-row items-center justify-between gap-3">
                <div className="hidden text-sm text-text-tertiary sm:block">
                  Last updated:{" "}
                  {new Date(link.updated).toLocaleDateString("en-sg", {
                    timeZone: "Asia/Singapore",
                  })}
                </div>
                <div className="flex flex-row gap-3">
                  <LinkButton variants={{ size: "sm" }} href={`https://l.joulev.dev/${link.slug}`}>
                    <ExternalLink /> Go
                  </LinkButton>
                  <CopyButton
                    variants={{ size: "sm" }}
                    content={`https://l.joulev.dev/${link.slug}`}
                  />
                  <Button variants={{ size: "sm" }}>
                    <Pen /> Edit
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </main>
  );
}
