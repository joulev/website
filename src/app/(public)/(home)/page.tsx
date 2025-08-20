import type { Metadata } from "next";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { GitHub, Mail } from "~/components/icons";
import { Card } from "~/components/ui/card";
import { Link } from "~/components/ui/link";
import { List, ListContent, ListHeader, ListItem } from "~/components/ui/lists";

import { getMetadata } from "~/lib/seo";
import { getGithubReadme } from "./get-github-readme";
import { GitHubStats } from "./github-stats";
import { MusicData } from "./music-data";

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
        <section className="flex flex-col gap-9 bg-bg-darker p-6 pt-9 sm:p-9">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-medium">Vu Van Dung</h1>
            <dl className="flex flex-row flex-wrap justify-between sm:justify-normal gap-x-9 gap-y-2 font-mono text-text-secondary [&_a:hover]:text-text-primary [&_a]:transition">
              <div className="flex flex-col gap-2">
                <dt className="sr-only">Native Vietnamese name</dt>
                <dd className="flex flex-row items-center gap-3">
                  <svg width="24" height="24" fill="none" className="not-sr-only">
                    <title>Vietnam flag</title>
                    <g clipPath="url(#a)">
                      <path
                        className="stroke-text-tertiary"
                        d="M2.667 3.833h18.666A2.167 2.167 0 0 1 23.5 6v12a2.167 2.167 0 0 1-2.167 2.167H2.667A2.167 2.167 0 0 1 .5 18V6a2.167 2.167 0 0 1 2.167-2.167Z"
                      />
                      <path
                        className="fill-text-secondary"
                        d="M13.169 10.691 12 7.095l-1.169 3.596H7.05l3.06 2.222-1.17 3.597L12 14.287l3.06 2.223-1.17-3.597 3.06-2.222h-3.781Z"
                      />
                    </g>
                    <defs>
                      <clipPath id="a">
                        <path fill="#fff" d="M0 0h24v24H0z" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>
                    <a
                      href="https://en.wiktionary.org/wiki/Vũ"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Vũ
                    </a>{" "}
                    <a
                      href="https://en.wiktionary.org/wiki/Văn"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Văn
                    </a>{" "}
                    <a
                      href="https://en.wiktionary.org/wiki/Dũng"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <strong>Dũng</strong>
                    </a>{" "}
                    <span className="font-sans text-xs text-text-tertiary">/vu van zuŋ/</span>
                  </span>
                </dd>
                <dt className="sr-only">Location</dt>
                <dd className="flex flex-row items-center gap-3">
                  <svg width="24" height="24" fill="none" className="not-sr-only">
                    <title>Location</title>
                    <path
                      d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
                      className="stroke-text-tertiary"
                    />
                    <circle cx="12" cy="10" r="3" className="fill-text-secondary" />
                  </svg>
                  <span>Singapore</span>
                </dd>
              </div>
              <div className="flex flex-col gap-2 sm:mx-auto">
                <dt className="sr-only">GitHub Profile</dt>
                <dd className="flex flex-row items-center gap-3">
                  <GitHub className="[&_path]:stroke-1 text-text-tertiary not-sr-only" />
                  <a href="https://github.com/joulev" target="_blank" rel="noreferrer noopener">
                    @joulev
                  </a>
                </dd>
                <dt className="sr-only">Email</dt>
                <dd className="flex flex-row items-center gap-3">
                  <Mail className="[&_path]:stroke-1 text-text-tertiary not-sr-only" />
                  <a href="mailto:me@joulev.dev" target="_blank" rel="noreferrer noopener">
                    me@joulev.dev
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          {/* Thanks LinkedIn Premium Trial */}
          {/* <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col gap-3 grow">
              <h2 className="flex flex-row text-lg font-bold gap-3 items-center">
                <svg viewBox="0 0 24 24" fill="none" className="size-8 text-text-secondary">
                  <title>Announcement</title>
                  <path
                    fill="currentColor"
                    d="m3.34 8.943-.214-.977a1 1 0 0 0-.724.629l.937.348Zm-.141 3.8-.969.248.969-.248Zm1.955 3.298-.662.749a1 1 0 0 0 .915.218l-.253-.967Zm7.987-1.375.037.999-.037-1Zm-2.074-8.112-.422-.906.422.906Zm-2.325 8.612a1 1 0 0 0-1.937.495l1.937-.495ZM9.2 20.99l-.97.248a1 1 0 0 0 .967.752l.003-1Zm4.45.01-.003 1a1 1 0 0 0 .971-1.248L13.65 21Zm-.588-6.331a1 1 0 1 0-1.937.495l1.938-.495Zm6.455-5.819c.41 1.603.544 3.066.458 4.12-.044.532-.139.901-.242 1.121-.106.228-.147.155-.02.124l.466 1.945c.706-.169 1.129-.714 1.366-1.222.241-.516.37-1.146.423-1.805.11-1.33-.064-3.021-.514-4.778l-1.937.495Zm.196 5.365c.121-.029.108.05-.104-.109-.202-.152-.468-.44-.764-.893-.586-.896-1.172-2.252-1.581-3.854l-1.938.495c.45 1.758 1.11 3.33 1.846 4.454.365.558.779 1.053 1.235 1.396.446.336 1.072.624 1.772.456l-.466-1.945Zm-2.45-4.856c-.41-1.603-.544-3.066-.458-4.12.044-.532.14-.901.242-1.121.106-.228.147-.155.02-.125l-.466-1.944c-.705.169-1.128.714-1.366 1.222-.241.516-.37 1.146-.423 1.805-.11 1.33.065 3.02.514 4.778l1.938-.495Zm-.196-5.366c-.121.03-.108-.05.104.11.202.152.468.44.764.892.586.897 1.172 2.253 1.582 3.855l1.937-.495c-.45-1.758-1.11-3.33-1.846-4.455-.364-.557-.778-1.052-1.235-1.395-.446-.336-1.072-.624-1.772-.456l.466 1.944ZM3.34 8.943l-.937-.347-.001.002L2.4 8.6a1.487 1.487 0 0 0-.04.114 7.99 7.99 0 0 0-.276 1.226 7.878 7.878 0 0 0 .146 3.05l1.938-.496a5.88 5.88 0 0 1-.104-2.27 5.993 5.993 0 0 1 .2-.893 1.905 1.905 0 0 1 .014-.043v.001a.028.028 0 0 0-.001.001l-.938-.348ZM2.23 12.991c.301 1.176.863 2.117 1.338 2.758a8.25 8.25 0 0 0 .831.955 4.021 4.021 0 0 0 .082.076l.006.006.003.002.001.001s.001.001.663-.748l.663-.75v.001h.001l.001.002-.004-.004-.03-.03a6.249 6.249 0 0 1-.61-.705c-.374-.5-.79-1.208-1.007-2.06l-1.938.496Zm2.924 3.05.253.967h.003l.009-.003.039-.01.153-.039a64.184 64.184 0 0 1 2.55-.58c1.592-.328 3.521-.657 5.017-.711l-.073-1.999c-1.67.06-3.735.42-5.346.75a66.246 66.246 0 0 0-2.798.642l-.044.011-.011.003-.003.001h-.001l.252.968Zm8.024-.376c1.258-.046 2.901.078 4.26.22a64.354 64.354 0 0 1 2.317.286l.033.004.008.002h.002l.148-.99.147-.988h-.003l-.01-.002-.037-.006-.14-.02a66.352 66.352 0 0 0-2.256-.275c-1.377-.144-3.136-.28-4.542-.23l.072 1.999Zm3.656-12.644-.583-.812-.002.001a.293.293 0 0 1-.006.005l-.027.019a32.326 32.326 0 0 1-.514.36c-.347.24-.835.571-1.396.937-1.134.739-2.527 1.59-3.66 2.117l.842 1.813c1.27-.59 2.76-1.506 3.91-2.254a64.521 64.521 0 0 0 1.978-1.344l.03-.022a.453.453 0 0 0 .008-.005l.003-.002-.583-.813Zm-6.189 2.627c-1.347.626-3.211 1.206-4.777 1.634a64.184 64.184 0 0 1-2.73.682l-.01.002h-.001l.212.977.213.978h.001l.004-.001a3.731 3.731 0 0 0 .055-.013 34.558 34.558 0 0 0 .766-.178c.51-.122 1.218-.299 2.018-.518 1.585-.434 3.584-1.049 5.093-1.75l-.844-1.813ZM6.805 15.66l1.426 5.577 1.937-.496-1.426-5.576-1.937.495Zm2.392 6.329 4.45.01.005-2-4.45-.01-.005 2Zm5.421-1.238-1.556-6.083-1.937.495 1.556 6.084 1.937-.496Z"
                  />
                </svg>
                <span>I am looking for work!</span>
              </h2>
              <div className="prose max-w-none">
                <p>
                  I am currently looking for full time opportunities starting{" "}
                  <strong>May&nbsp;2025</strong> in&nbsp;<strong>🇸🇬&nbsp;Singapore</strong>.
                </p>
              </div>
            </div>
            <div className="flex flex-row-reverse sm:flex-row items-end gap-3">
              <LinkButton
                href="/cv"
                target="_blank"
                rel="noopener noreferer"
                className="w-1/2 shrink"
              >
                <ExternalLink />
                Resume
              </LinkButton>
              <LinkButton
                href="mailto:me@joulev.dev"
                variants={{ variant: "primary" }}
                className="w-1/2 shrink"
              >
                <Mail />
                Contact
              </LinkButton>
            </div>
          </div> */}
        </section>
        <section className="flex flex-col gap-6 p-6 sm:p-9">
          <h2 className="sr-only">About me</h2>
          <ReadmeContent />
          <div className="grid grid-cols-1 grid-rows-2 gap-6 sm:grid-cols-2 sm:grid-rows-1">
            <GitHubStats />
            <MusicData />
          </div>
        </section>
        <hr />
        <div className="mx-auto flex w-full max-w-lg flex-col gap-6 p-6 sm:p-9">
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
        </div>
      </Card>
    </main>
  );
}

export const metadata: Metadata = getMetadata({
  title: "Vu Van Dung",
  description: "My personal homepage on the Internet",
  url: "/",
});

export const revalidate = 3600;
