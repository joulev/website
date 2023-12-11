import { Balancer } from "react-wrap-balancer";

import { Share } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Link } from "~/components/ui/link";
import { cn } from "~/lib/cn";

import type { LayoutProps } from "./$types";
import styles from "./prose.module.css";

export default function Layout({ children, title }: LayoutProps & { title: string }) {
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
              maskImage: "linear-gradient(to right, transparent, black)",
            }}
          />
          <div className="flex max-w-prose flex-col gap-6 max-blog-lg:mx-auto">
            <h1 className="text-3xl font-bold md:text-4xl blog-lg:text-5xl">
              <Balancer>{title}</Balancer>
            </h1>
            <div className="flex flex-row items-center">
              <div className="mr-4 flex flex-row gap-3 border-r border-separator pr-4">
                <Button variants={{ size: "sm" }}>
                  <Share /> Share
                </Button>
              </div>
              <div className="text-sm text-text-secondary">Posted 10 December 2023</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col divide-y divide-separator blog-lg:flex-row blog-lg:divide-x blog-lg:divide-y-0">
          <div className={cn("p-6 blog-lg:p-12", styles.proseWrapper)}>{children}</div>
          <div className="flex flex-col p-6 text-text-secondary blog-lg:p-12">
            <div className="flex-grow max-blog-lg:hidden" />
            <div className="sticky bottom-12 mx-auto hidden max-w-prose flex-col gap-3 blog-lg:flex [&_div]:text-sm">
              <div>This article was edited 3 times</div>
              <div>Last updated: 10 December 2023</div>
              <div className="flex flex-row gap-4">
                <Link href="https://google.com">View source</Link>
                <div className="w-px bg-separator" />
                <Link href="https://google.com">View history</Link>
              </div>
            </div>
            <div className="mx-auto flex w-full max-w-prose flex-col gap-3 blog-lg:hidden [&_div]:text-sm">
              <div>
                This article was edited 3 times, last updated on{" "}
                <span className="whitespace-nowrap">10 December 2023</span>.
              </div>
              <div className="flex flex-row gap-4">
                <Link href="https://google.com">View source</Link>
                <div className="w-px bg-separator" />
                <Link href="https://google.com">View history</Link>
                <div className="w-px bg-separator" />
                <button type="button" className="link">
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </main>
  );
}
