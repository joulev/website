import { type Fragment, type Jsx, compile, run } from "@mdx-js/mdx";
import type { GetResponseDataTypeFromEndpointMethod } from "@octokit/types";
import matter from "gray-matter";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { cache } from "react";
import * as brokenRuntime from "react/jsx-runtime";
import rehypePrettyCode, { type Theme } from "rehype-pretty-code";
import * as v from "valibot";

import { env } from "~/env.mjs";

import { octokit } from "./octokit";

const BLOGS_DIR = join(process.cwd(), "contents", "blogs");
const EXT = "mdx";

// @ts-expect-error: the automatic react runtime is untyped.
// https://github.com/mdx-js/mdx/pull/2383
const runtime: { Fragment: Fragment; jsx: Jsx; jsxs: Jsx } = brokenRuntime;

const getShikiTheme = cache(async () => {
  const themeJson: unknown = await fetch(env.EDITOR_THEME_URL).then(r => r.json());
  return themeJson as Theme;
});

const getMatterData = cache(async (slug: string) => {
  const fileContent = await readFile(join(BLOGS_DIR, `${slug}.${EXT}`), "utf8");
  const { content, data } = matter(fileContent);
  const typeSafeData = v.parse(v.object({ title: v.string(), description: v.string() }), data);
  return { ...typeSafeData, md: content };
});

const getPostGitHubData = cache(async (slug: string) => {
  let page = 1;
  const commits: GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.repos.listCommits> = [];
  const PER_PAGE = 100;
  while (true) {
    // eslint-disable-next-line no-await-in-loop -- Loops are not independent
    const response = await octokit.rest.repos.listCommits({
      owner: "joulev",
      repo: "website",
      path: `contents/blogs/${slug}.mdx`,
      per_page: PER_PAGE,
      page,
    });
    commits.concat(response.data);
    if (response.data.length < PER_PAGE) break;
    page++;
  }
  const updatedTimesCount = commits.length;
  const publishedTime = new Date(commits.at(-1)?.commit.author?.date ?? new Date());
  const updatedTime = new Date(commits.at(0)?.commit.author?.date ?? new Date());
  return { updatedTimesCount, updatedTime, publishedTime };
});

const getPostMarkdownData = cache(async (slug: string) => {
  const [{ md, ...metadata }, shikiTheme] = await Promise.all([
    getMatterData(slug),
    getShikiTheme(),
  ]);
  const mdxOutput = String(
    await compile(md, {
      outputFormat: "function-body",
      rehypePlugins: [[rehypePrettyCode, { keepBackground: false, theme: shikiTheme }]],
    }),
  );
  const { default: Content } = await run(mdxOutput, { ...runtime, baseUrl: import.meta.url });
  return { Content, ...metadata };
});

export const getPost = cache(async (slug: string) => {
  const [markdownData, gitHubData] = await Promise.all([
    getPostMarkdownData(slug),
    getPostGitHubData(slug),
  ]);
  return { ...markdownData, ...gitHubData, slug };
});

export const getAllSlugs = cache(async () => {
  const slugs = await readdir(BLOGS_DIR);
  return slugs.map(slug => slug.replace(new RegExp(`\\.${EXT}$`), ""));
});

export const getAllPosts = cache(async () => {
  const slugs = await getAllSlugs();
  const posts = await Promise.all(slugs.map(getPost));
  return posts.sort((a, b) => b.publishedTime.getTime() - a.publishedTime.getTime());
});

export function formatTime(date: Date) {
  // "10 December 2023"
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
