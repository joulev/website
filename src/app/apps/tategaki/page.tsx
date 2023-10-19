import type { Metadata } from "next";
import { Noto_Serif_JP as NotoSerifJP } from "next/font/google";

import { PageClient } from "./page.client";

const serif = NotoSerifJP({ subsets: ["latin"], weight: "400" });

export default function Page() {
  return (
    <div className={serif.className}>
      <PageClient />
    </div>
  );
}

export const metadata: Metadata = {
  title: "joulev.dev » tategaki",
  description: "A website featuring text displayed in Japanese vertical writing style",
  openGraph: {
    title: "joulev.dev » tategaki",
    description: "A website featuring text displayed in Japanese vertical writing style",
    url: "/apps/tategaki",
  },
};
