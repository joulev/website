import { Github, Mail } from "lucide-react";

import { LinkButton } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Link } from "~/components/ui/link";

import { GitHubStats } from "./github-stats";
import { MusicData } from "./music-data";

export default function Page() {
  return (
    <main className="container max-w-screen-md py-24">
      <Card className="flex flex-col p-0">
        <div className="flex flex-col items-start gap-6 bg-bg-darker p-6 sm:flex-row sm:items-end sm:justify-between">
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
        </div>
        <div className="flex flex-col gap-6 p-6">
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
            I am also active on Discord and you can find me as a moderator on{" "}
            <Link href="https://discord.gg/nextjs">the official Next.js Discord server</Link>.
          </p>
          <div className="grid grid-cols-1 grid-rows-2 gap-6 sm:grid-cols-2 sm:grid-rows-1">
            <GitHubStats />
            <MusicData />
          </div>
        </div>
      </Card>
    </main>
  );
}
