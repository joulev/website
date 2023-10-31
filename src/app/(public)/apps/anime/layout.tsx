import type { Metadata } from "next";

import { AnimeLayout } from "~/components/anime/layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AnimeLayout>{children}</AnimeLayout>;
}

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
