import { execSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { meta } from "./(public)/blogs/meta";

function getLastUpdatedDate(filePath: string) {
  const command = `git log -1 --format=%cd --date=format:'%Y-%m-%d' '${filePath}'`;
  const lastCommitDate = execSync(command, { encoding: "utf-8" }).trim();
  return lastCommitDate;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  now.setUTCHours(0, 0, 0, 0);
  return [
    {
      url: "https://joulev.dev",
      lastModified: new Date(getLastUpdatedDate("src/app/(public)/(home)")),
      priority: 1,
    },
    {
      url: "https://joulev.dev/glui",
      lastModified: new Date(getLastUpdatedDate("src/app/(public)/glui")),
      priority: 1,
    },
    {
      url: "https://joulev.dev/blogs",
      lastModified: new Date(getLastUpdatedDate("src/app/(public)/blogs/meta.ts")),
      priority: 0.9,
    },
    ...meta.map(({ slug, postedDate }) => ({
      url: `https://joulev.dev/blogs/${slug}`,
      lastModified: new Date(postedDate),
      priority: 0.9,
    })),
    ...[
      "",
      "/watching",
      "/rewatching",
      "/completed/tv",
      "/completed/movies",
      "/completed/others",
      "/paused",
      "/dropped",
      "/planning",
    ].map(status => ({
      url: `https://joulev.dev/apps/anime${status}`,
      lastModified: now,
      changeFrequency: "daily" as const,
    })),
    {
      url: "https://joulev.dev/apps/cuid2",
      lastModified: new Date(getLastUpdatedDate("src/app/(public)/apps/cuid2")),
    },
    {
      url: "https://joulev.dev/apps/irasuto",
      lastModified: now,
      changeFrequency: "daily",
    },
    {
      url: "https://joulev.dev/apps/irasuto/random",
      lastModified: now,
      changeFrequency: "daily",
    },
    {
      url: "https://joulev.dev/apps/link",
      lastModified: new Date(getLastUpdatedDate("src/app/(public)/apps/link")),
    },
    {
      url: "https://joulev.dev/apps/snippets",
      lastModified: new Date(getLastUpdatedDate("src/app/(public)/apps/snippets")),
    },
    {
      url: "https://joulev.dev/apps/tategaki",
      lastModified: new Date(getLastUpdatedDate("src/app/(public)/apps/tategaki")),
    },
  ];
}
