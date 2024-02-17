import type { Metadata } from "next";

import { makeMetadata } from "~/lib/blogs/utils";

import { Map } from "./map";

export default function Page() {
  return <Map />;
}

export const metadata: Metadata = makeMetadata("walking-on-singapore-mrt-lines");
