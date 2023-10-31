import type { Metadata } from "next";

export { AnimeLayout as default } from "~/components/anime/layout";

export const metadata: Metadata = {
  title: {
    template: "%s – joulev » anime",
    default: "joulev » anime",
  },
  description: "joulev's anime list",
  openGraph: {
    title: "joulev.dev » anime",
    description: "joulev's anime list",
    url: "/apps/anime",
  },
};
