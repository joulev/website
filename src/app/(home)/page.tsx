import { ChevronRight, Github, Mail } from "lucide-react";
import { type Metadata } from "next";

import { LinkButton } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Link } from "~/components/ui/link";
import { List, ListContent, ListFooter, ListHeader, ListItem } from "~/components/ui/lists";
import { cn } from "~/lib/cn";

import { GitHubStats } from "./github-stats";
import { MusicData } from "./music-data";
import styles from "./page.module.css";

export default function Page() {
  return (
    <main className="container max-w-screen-md">
      <Card className="flex flex-col p-0">
        <section className="flex flex-col items-start gap-6 bg-bg-darker p-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-medium">Vu Van Dung</h1>
            <div className="text-text-secondary">@joulev</div>
          </div>
          <div className="flex flex-row gap-3">
            <LinkButton href="https://github.com/joulev" target="_blank" rel="noreferrer noopener">
              <Github /> GitHub
            </LinkButton>
            <LinkButton href="mailto:me@joulev.dev" target="_blank" rel="noreferrer noopener">
              <Mail /> Email
            </LinkButton>
          </div>
        </section>
        <hr />
        <section className="flex flex-col bg-bg-darker sm:flex-row">
          <div className="flex flex-col items-start gap-6 p-6 sm:w-2/3">
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
            className="relative min-h-[120px] flex-grow bg-[1.5rem_0px] sm:bg-[0px_1.5rem]"
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
        <section className="flex flex-col gap-6 p-6">
          <p>
            I am a software developer. I build things for the web, mostly using{" "}
            <Link href="https://nextjs.org">Next.js</Link>.
          </p>
          <p>
            In free time, I usually either work on side projects or learn about new stuff related to
            web development. Or just randomly walk around in a quiet park, because Singapore has a
            lot of them and I find them very peaceful.
          </p>
          <p>
            I almost always listen to music whenever I can. My taste ranges from beautiful classical
            masterpieces or movie soundtracks to catchy Japanese popular music.
          </p>
          <p>
            I am also active on Discord. You can find me as a moderator and helper on{" "}
            <Link href="https://discord.gg/nextjs">the official Next.js Discord server</Link>.
          </p>
          <div className="grid grid-cols-1 grid-rows-2 gap-6 sm:grid-cols-2 sm:grid-rows-1">
            <GitHubStats />
            <MusicData />
          </div>
        </section>
        <hr />
        <section className="mx-auto flex max-w-lg flex-col gap-6 p-6">
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
            </ListContent>
          </List>
          <List>
            <ListHeader asChild>
              <h2>Apps</h2>
            </ListHeader>
            <ListContent variants={{ withSeparator: false }}>
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
              <h2>Apps at joulev.dev</h2>
            </ListHeader>
            <ListContent variants={{ withSeparator: false }}>
              <ListItem asChild>
                <Link unstyled href="https://tategaki.joulev.dev/">
                  tategaki
                </Link>
              </ListItem>
              <ListItem asChild>
                <Link unstyled href="https://anime.joulev.dev/">
                  anime
                </Link>
              </ListItem>
              <ListItem asChild>
                <Link unstyled href="/apps/link">
                  link
                </Link>
              </ListItem>
              <ListItem asChild>
                <Link unstyled href="https://presentation.joulev.dev/">
                  presentation
                </Link>
              </ListItem>
              <ListItem asChild>
                <Link unstyled href="/apps/irasuto">
                  irasuto
                </Link>
              </ListItem>
            </ListContent>
            <ListFooter>
              These apps will be incrementally migrated into joulev.dev/apps under the new design
              system in the upcoming months.
            </ListFooter>
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
  },
};
