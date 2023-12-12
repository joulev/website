import { type Fragment, type Jsx, compile, run } from "@mdx-js/mdx";
import matter from "gray-matter";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { cache } from "react";
import * as brokenRuntime from "react/jsx-runtime";
import rehypePrettyCode, { type Theme } from "rehype-pretty-code";
import * as v from "valibot";

import { env } from "~/env.mjs";

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
  const { title } = v.parse(v.object({ title: v.string() }), data);
  return { title, md: content };
});

export const getPost = cache(async (slug: string) => {
  const [{ title, md }, shikiTheme] = await Promise.all([getMatterData(slug), getShikiTheme()]);
  const mdxOutput = String(
    await compile(md, {
      outputFormat: "function-body",
      rehypePlugins: [[rehypePrettyCode, { keepBackground: false, theme: shikiTheme }]],
    }),
  );
  const { default: Content } = await run(mdxOutput, { ...runtime, baseUrl: import.meta.url });
  return { title, Content };
});

export const getAllSlugs = cache(async () => {
  const slugs = await readdir(BLOGS_DIR);
  return slugs.map(slug => slug.replace(new RegExp(`\\.${EXT}$`), ""));
});
