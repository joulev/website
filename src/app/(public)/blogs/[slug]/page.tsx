import { type Fragment, type Jsx, run } from "@mdx-js/mdx";
import { Balancer } from "react-wrap-balancer";
import * as brokenRuntime from "react/jsx-runtime";

import { CopyButton } from "~/components/copy-button";
import { Check, Share } from "~/components/icons";
import { Card } from "~/components/ui/card";
import { Link } from "~/components/ui/link";
import { getAllSlugs, getPost } from "~/lib/blogs";

import type { PageProps, Params } from "./$types";
import { Figure, Pre } from "./components";

// @ts-expect-error: the automatic react runtime is untyped.
// https://github.com/mdx-js/mdx/pull/2383
const runtime: { Fragment: Fragment; jsx: Jsx; jsxs: Jsx } = brokenRuntime;

function getGitHubData(slug: string) {
  return {
    updatedTimes: 3,
    lastUpdated: new Date("2023-12-10"),
  };
}

function formatTime(date: Date) {
  // "10 December 2023"
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default async function Page({ params }: PageProps) {
  const [{ title, mdxOutput }, ghData] = await Promise.all([
    getPost(params.slug),
    getGitHubData(params.slug),
  ]);
  const { default: Content } = await run(mdxOutput, { ...runtime, baseUrl: import.meta.url });

  const sourceLink = `https://github.com/joulev/website/blob/main/contents/blogs/${params.slug}.mdx`;
  const historyLink = `https://github.com/joulev/website/commits/main/contents/blogs/${params.slug}.mdx`;

  return (
    <main className="container max-w-screen-xl">
      <Card className="flex flex-col p-0">
        <div className="relative border-b border-separator bg-bg-darker px-6 pb-6 pt-36 md:pb-12 blog-lg:px-12">
          <div
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg' %3E%3Ccircle cx='2' cy='2' r='2' fill='%23afafaf70' /%3E%3C/svg%3E\")",
              backgroundPosition: "0px 16px",
              maskImage: "linear-gradient(to top right, #0000 0%, #0003 50%, #000 100%)",
            }}
          />
          <div className="flex max-w-prose flex-col gap-6 max-blog-lg:mx-auto">
            <h1 className="text-3xl font-bold md:text-4xl blog-lg:text-5xl">
              <Balancer>{title}</Balancer>
            </h1>
            <div className="flex flex-row items-center">
              <div className="mr-4 flex flex-row gap-3 border-r border-separator pr-4">
                <CopyButton
                  content={`https://joulev.dev/blogs/${params.slug}`}
                  variants={{ size: "sm" }}
                  copyChildren={
                    <>
                      <Share /> Share
                    </>
                  }
                  copiedChildren={
                    <>
                      <Check /> Link copied!
                    </>
                  }
                />
              </div>
              <div className="text-sm text-text-secondary">
                Posted{" "}
                <time
                  dateTime={ghData.lastUpdated.toISOString()}
                  title={ghData.lastUpdated.toISOString()}
                >
                  {formatTime(ghData.lastUpdated)}
                </time>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col divide-y divide-separator blog-lg:flex-row blog-lg:divide-x blog-lg:divide-y-0">
          <article className="prose max-w-none p-[--p] [--p:24px] blog-lg:[--p:48px] [&>*]:mx-auto [&>*]:max-w-prose">
            <Content components={{ pre: Pre, figure: Figure }} />
          </article>
          <div className="flex flex-col p-6 text-text-secondary blog-lg:p-12">
            <div className="flex-grow max-blog-lg:hidden" />
            <div className="sticky bottom-12 mx-auto hidden max-w-prose flex-col gap-3 blog-lg:flex [&_div]:text-sm">
              <div>
                This article was edited {ghData.updatedTimes} time
                {ghData.updatedTimes === 1 ? "" : "s"}.
              </div>
              <div>
                Last updated:{" "}
                <time
                  dateTime={ghData.lastUpdated.toISOString()}
                  title={ghData.lastUpdated.toISOString()}
                >
                  {formatTime(ghData.lastUpdated)}
                </time>
                .
              </div>
              <div className="flex flex-row gap-4">
                <Link href={sourceLink}>View source</Link>
                <div className="w-px bg-separator" />
                <Link href={historyLink}>View history</Link>
              </div>
            </div>
            <div className="mx-auto flex w-full max-w-prose flex-col gap-3 blog-lg:hidden [&_div]:text-sm">
              <div>
                This article was edited {ghData.updatedTimes} time
                {ghData.updatedTimes === 1 ? "" : "s"}, last updated on{" "}
                <time
                  dateTime={ghData.lastUpdated.toISOString()}
                  title={ghData.lastUpdated.toISOString()}
                  className="whitespace-nowrap"
                >
                  {formatTime(ghData.lastUpdated)}
                </time>
                .
              </div>
              <div className="flex flex-row gap-4">
                <Link href={sourceLink}>View source</Link>
                <div className="w-px bg-separator" />
                <Link href={historyLink}>View history</Link>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </main>
  );
}

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getAllSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { title } = await getPost(params.slug);
  return { title };
}

export const dynamicParams = false;
