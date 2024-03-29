import type { Metadata } from "next";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { ChevronRight, GitHub, Mail } from "~/components/icons";
import { LinkButton } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Link } from "~/components/ui/link";
import { List, ListContent, ListHeader, ListItem } from "~/components/ui/lists";
import { cn } from "~/lib/cn";

import { opengraphImage } from "~/app/opengraph";

import { getGithubReadme } from "./get-github-readme";
import { GitHubStats } from "./github-stats";
import { MusicData } from "./music-data";
import styles from "./page.module.css";

function ReadmeA({ href, ...rest }: React.ComponentPropsWithoutRef<"a">) {
  return <Link href={href ?? "/"} {...rest} />;
}

async function ReadmeContent() {
  const markdown = await getGithubReadme();
  return (
    <Markdown remarkPlugins={[remarkGfm]} components={{ a: ReadmeA }}>
      {markdown}
    </Markdown>
  );
}

export default function Page() {
  return (
    <main className="container max-w-screen-md">
      <Card className="flex flex-col p-0">
        <section className="flex flex-col items-start gap-6 bg-bg-darker p-6 sm:flex-row sm:items-end sm:justify-between sm:p-9">
          <div>
            <h1 className="text-3xl font-medium">Vu Van Dung</h1>
            <div className="text-text-secondary">@joulev</div>
          </div>
          <div className="flex flex-row gap-3">
            <LinkButton href="https://github.com/joulev" target="_blank" rel="noreferrer noopener">
              <GitHub /> GitHub
            </LinkButton>
            <LinkButton href="mailto:me@joulev.dev" target="_blank" rel="noreferrer noopener">
              <Mail /> Email
            </LinkButton>
          </div>
        </section>
        <hr />
        <section className="flex flex-col bg-bg-darker sm:flex-row">
          <div className="flex flex-col items-start gap-6 p-6 sm:w-2/3 sm:p-9">
            <h2 className="text-lg font-bold">Current project</h2>
            <p>
              I am building a glassmorphic component system based on{" "}
              <Link href="https://www.figma.com/community/file/1253443272911187215/apple-design-resources-visionos">
                visionOS UI design
              </Link>
              . You are seeing that design system at work in this very page, and if you are curious,
              you can check out the completed components (so far) here:
            </p>
            <LinkButton href="/glui" variants={{ variant: "primary" }}>
              Completed components
              <ChevronRight />
            </LinkButton>
          </div>
          <div
            className="relative min-h-[120px] flex-grow bg-[1.5rem_0px] sm:bg-[0px_2.5rem]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='54' height='54' viewBox='0 0 54 54' fill='none' xmlns='http://www.w3.org/2000/svg' %3E%3Crect x='5' y='5' width='36' height='36' rx='4' stroke='%238080804d' strokeWidth='2' /%3E%3C/svg%3E\")",
            }}
          >
            <div
              className={cn(
                "absolute left-1/2 top-1/2 h-18 w-24 -translate-x-[68px] -translate-y-12 rounded-[1rem] bg-bg-idle backdrop-blur",
                styles.cardSm,
              )}
            />
            <div
              className={cn(
                "absolute left-1/2 top-1/2 h-18 w-24 -translate-x-7 -translate-y-6 rounded-[1rem] bg-bg-idle backdrop-blur",
                styles.cardSm,
              )}
            />
          </div>
        </section>
        <section className="flex flex-col gap-6 p-6 sm:p-9">
          <ReadmeContent />
          <div className="grid grid-cols-1 grid-rows-2 gap-6 sm:grid-cols-2 sm:grid-rows-1">
            <GitHubStats />
            <MusicData />
          </div>
        </section>
        <hr />
        <section className="mx-auto flex w-full max-w-lg flex-col gap-6 p-6 sm:p-9">
          <List>
            <ListHeader asChild>
              <h2>Packages</h2>
            </ListHeader>
            <ListContent>
              <ListItem asChild>
                <Link unstyled href="https://github.com/joulev/tailwind-dark-aware">
                  tailwind-dark-aware
                </Link>
              </ListItem>
              <ListItem asChild>
                <Link unstyled href="https://github.com/joulev/nextjs-route-types">
                  nextjs-route-types
                </Link>
              </ListItem>
              <ListItem asChild>
                <Link unstyled href="https://github.com/joulev/analyse-client-components">
                  @joulev/analyse-client-components
                </Link>
              </ListItem>
            </ListContent>
          </List>
          <List>
            <ListHeader asChild>
              <h2>Apps</h2>
            </ListHeader>
            <ListContent>
              <ListItem asChild>
                <Link unstyled href="https://nextjs-faq.com">
                  nextjs-faq
                </Link>
              </ListItem>
              <ListItem asChild>
                <Link unstyled href="https://ezkomment.joulev.dev">
                  ezkomment
                </Link>
              </ListItem>
            </ListContent>
          </List>
          <List>
            <ListHeader asChild>
              <h2>Small services</h2>
            </ListHeader>
            <ListContent>
              <ListItem asChild>
                <Link unstyled href="https://github.com/joulev/latex2svg-service">
                  latex2svg
                </Link>
              </ListItem>
              <ListItem asChild>
                <Link unstyled href="https://github.com/joulev/mrt-badges">
                  mrt-badges
                </Link>
              </ListItem>
            </ListContent>
          </List>
          <List>
            <ListHeader asChild>
              <h2>Small-ish apps at joulev.dev</h2>
            </ListHeader>
            <ListContent>
              <ListItem asChild>
                <Link unstyled href="/glui">
                  glui: Glassmorphic UI components
                </Link>
              </ListItem>
              {["anime", "cuid2", "irasuto", "link", "snippets", "tategaki"].map(app => (
                <ListItem asChild key={app}>
                  <Link unstyled href={`/apps/${app}`}>
                    {app}
                  </Link>
                </ListItem>
              ))}
            </ListContent>
          </List>
        </section>
      </Card>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Vu Van Dung",
  description: "Software developer. I build things for the web.",
  openGraph: {
    title: "Vu Van Dung",
    description: "Software developer. I build things for the web.",
    url: "/",
    ...opengraphImage,
  },
};
