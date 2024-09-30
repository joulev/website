import type { Metadata } from "next";

import { getMetadata } from "~/lib/seo";
import { Editor } from "./editor";

export default function Page() {
  return (
    <main className="container max-w-[100ch]">
      <Editor />
    </main>
  );
}

export const metadata: Metadata = getMetadata({
  title: "joulev.dev » snippets",
  description: "Upload and share short code snippets",
  url: "/apps/snippets",
});
