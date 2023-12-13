import { ChevronLeft } from "~/components/icons";
import { LinkButton } from "~/components/ui/button";
import { Card } from "~/components/ui/card";

import type { LayoutProps } from "./$types";
import {
  IncrementViews,
  PostTitle,
  PostedDate,
  ShareButton,
  ViewSourceHistory,
} from "./client-components";

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="container max-w-screen-xl">
      <Card className="flex flex-col p-0">
        <div className="relative border-b border-separator bg-bg-darker px-6 pb-6 pt-36 md:pb-12 blog-lg:px-12">
          <div
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg' %3E%3Ccircle cx='2' cy='2' r='2' fill='%23afafaf70' /%3E%3C/svg%3E\")",
              backgroundPosition: "13px 16px",
              maskImage: "linear-gradient(to top right, #0000 0%, #0003 50%, #000 100%)",
            }}
          />
          <div className="flex max-w-prose flex-col gap-6 max-blog-lg:mx-auto">
            <PostTitle />
            <div className="flex flex-row items-center">
              <div className="mr-4 flex flex-row gap-3 border-r border-separator pr-4">
                <ShareButton />
              </div>
              <PostedDate />
            </div>
          </div>
        </div>
        <div className="flex flex-col divide-y divide-separator blog-lg:flex-row blog-lg:divide-x blog-lg:divide-y-0">
          <article className="prose max-w-none px-[--p] py-12 [--p:24px] blog-lg:[--p:48px] [&>*]:mx-auto [&>*]:max-w-prose">
            {children}
            <div>
              <LinkButton href="/blogs" className="mt-6 no-underline">
                <ChevronLeft /> Back to blogs
              </LinkButton>
            </div>
          </article>
          <div className="flex flex-col p-6 text-text-secondary blog-lg:p-12">
            <div className="flex-grow max-blog-lg:hidden" />
            <div className="sticky bottom-12 mx-auto flex w-full max-w-prose flex-col gap-3 text-sm">
              <div>
                <span className="whitespace-nowrap">Unless explicitly noted,</span>{" "}
                <span className="whitespace-nowrap">all opinions are personal.</span>
              </div>
              <ViewSourceHistory />
            </div>
          </div>
        </div>
      </Card>
      <IncrementViews />
    </main>
  );
}
