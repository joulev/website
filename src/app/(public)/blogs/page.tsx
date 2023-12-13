import type { Metadata } from "next";
import { Balancer } from "react-wrap-balancer";

import { Title } from "~/components/title";
import { Card } from "~/components/ui/card";
import { formatTime } from "~/lib/blogs";

import { meta } from "./meta";
import { PostCard } from "./post-card";

export default function Page() {
  return (
    <main className="container max-w-screen-lg">
      <Card className="flex flex-col items-stretch p-0 md:flex-row md:divide-x md:divide-separator">
        <div className="bg-bg-darker md:w-64 md:shrink-0">
          <div className="mx-auto max-w-xl p-6 md:sticky md:top-0">
            <Title title="blogs" subtitle="My weird knowledge, noted down" />
          </div>
        </div>
        <div className="flex w-full flex-col divide-y divide-separator">
          {meta.map(post => {
            const publishedTime = new Date(post.postedDate);
            return (
              <PostCard slug={post.slug} key={post.slug}>
                <div className="mx-auto flex w-full max-w-xl flex-col gap-3 p-6">
                  <h2 className="text-xl font-bold md:text-2xl">
                    <Balancer>{post.title}</Balancer>
                  </h2>
                  <p className="text-text-secondary">{post.description}</p>
                  <div className="text-sm text-text-tertiary">
                    Posted{" "}
                    <time
                      dateTime={publishedTime.toISOString()}
                      title={publishedTime.toISOString()}
                    >
                      {formatTime(publishedTime)}
                    </time>
                  </div>
                </div>
              </PostCard>
            );
          })}
        </div>
      </Card>
    </main>
  );
}

export const metadata: Metadata = {
  title: "joulev.dev » blogs",
  description: "My collection of weird knowledge",
  openGraph: {
    title: "joulev.dev » blogs",
    description: "My collection of weird knowledge",
    url: "/blogs",
  },
};
