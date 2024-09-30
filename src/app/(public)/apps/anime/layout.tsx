import type { Metadata } from "next";

import { AnimeLayout } from "~/components/anime/layout";
import { getMetadata } from "~/lib/seo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AnimeLayout>{children}</AnimeLayout>;
}

export const metadata: Metadata = {
  ...getMetadata({
    title: "joulev.dev » anime",
    description: "joulev's anime list",
    url: "/apps/anime",
  }),
  title: {
    template: "%s – joulev » anime",
    default: "joulev » anime",
  },
};
