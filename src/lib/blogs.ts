import { compile } from "@mdx-js/mdx";
import matter from "gray-matter";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { cache } from "react";
import rehypePrettyCode, { type Theme } from "rehype-pretty-code";
import * as v from "valibot";

import { env } from "~/env.mjs";

const BLOGS_DIR = join(process.cwd(), "contents", "blogs");
const EXT = "mdx";

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
  try {
    const [{ title, md }, shikiTheme] = await Promise.all([getMatterData(slug), getShikiTheme()]);
    const mdxOutput = String(
      await compile(md, {
        outputFormat: "function-body",
        rehypePlugins: [[rehypePrettyCode, { keepBackground: false, theme: shikiTheme }]],
      }),
    );
    return { title, mdxOutput };
  } catch (e) {
    // Since we only do this during build, it's ok to throw errors. They will show up as build errors
    // not as runtime errors (which would need graceful handling via error boundaries)
    console.error(e);
    throw new Error(`Failed to get data for page ${slug}`);
  }
});

export const getAllSlugs = cache(async () => {
  const slugs = await readdir(BLOGS_DIR);
  return slugs.map(slug => slug.replace(new RegExp(`\\.${EXT}$`), ""));
});
