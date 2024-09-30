import type { Metadata } from "next";
import { getMetadata } from "~/lib/seo";
import { PageClient } from "./page-client";

export default function Page() {
  return <PageClient />;
}

export const metadata: Metadata = getMetadata({
  title: "joulev.dev » chat",
  description: "Internal",
  url: "/admin/chat",
});
