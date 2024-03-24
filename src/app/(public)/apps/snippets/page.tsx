import type { Metadata } from "next";

import { opengraphImage } from "~/app/opengraph";

import { Editor } from "./editor";

export default function Page() {
  return (
    <main className="container max-w-[100ch]">
      <Editor />
    </main>
  );
}

export const metadata: Metadata = {
  title: "joulev.dev » snippets",
  description: "Upload and share short code snippets",
  openGraph: {
    title: "joulev.dev » snippets",
    description: "Upload and share short code snippets",
    url: "/apps/snippets",
    ...opengraphImage,
  },
};
