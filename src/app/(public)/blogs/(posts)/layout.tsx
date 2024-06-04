import { ChevronLeft } from "~/components/icons";
import { LinkButton } from "~/components/ui/button";
import { Card } from "~/components/ui/card";

import type { LayoutProps } from "./$types";
import AboutTheAuthor from "./about-the-author.mdx";
import {
  Author,
  IncrementViews,
  PostTitle,
  PostedDate,
  ViewSourceHistory,
} from "./client-components";

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="container max-w-screen-xl">
      <Card className="flex flex-col p-0">
        <div className="relative border-b border-separator bg-bg-darker px-6 pb-9 pt-36 md:pb-12 blog-lg:px-12">
          <div
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg' %3E%3Ccircle cx='2' cy='2' r='2' fill='%23afafaf70' /%3E%3C/svg%3E\")",
              backgroundPosition: "13px 16px",
              maskImage: "linear-gradient(to top right, #0000 0%, #0003 50%, #000 100%)",
              WebkitMaskImage: "linear-gradient(to top right, #0000 0%, #0003 50%, #000 100%)",
            }}
          />
          <div className="flex max-w-prose flex-col gap-6 blog-lg:gap-9 max-blog-lg:mx-auto">
            <PostedDate />
            <PostTitle />
            <Author />
          </div>
        </div>
        <div className="flex flex-col divide-y divide-separator blog-lg:flex-row blog-lg:divide-x blog-lg:divide-y-0">
          <article className="prose max-w-none px-[--p] py-12 [--p:24px] *:mx-auto *:max-w-prose blog-lg:[--p:48px] shrink-0">
            {children}
            <div className="not-prose">
              <LinkButton href="/blogs" className="mt-6 text-text-primary no-underline">
                <ChevronLeft /> Back to blogs
              </LinkButton>
            </div>
          </article>
          <div className="flex flex-col p-6 blog-lg:p-12">
            <div className="flex-grow max-blog-lg:hidden" />
            <div className="sticky bottom-12 flex w-full flex-col gap-6 blog-lg:gap-12 text-sm">
              <div className="flex flex-col gap-3 max-w-prose mx-auto w-full">
                <h2 className="font-semibold text-base text-text-primary">About the author</h2>
                <div className="prose-sm max-w-none text-text-prose">
                  <AboutTheAuthor />
                </div>
              </div>
              <hr className="-mx-6 blog-lg:-mx-12" />
              <div className="flex flex-col gap-3 max-w-prose mx-auto w-full text-text-secondary">
                <div>
                  <span className="whitespace-nowrap">Unless explicitly noted,</span>{" "}
                  <span className="whitespace-nowrap">all opinions are personal.</span>
                </div>
                <ViewSourceHistory />
              </div>
            </div>
          </div>
        </div>
      </Card>
      <IncrementViews />
    </main>
  );
}
