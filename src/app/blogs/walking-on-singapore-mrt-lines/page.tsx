import type { Metadata } from "next";
import localFont from "next/font/local";

import { makeMetadata } from "~/lib/blogs/utils";
import { cn } from "~/lib/cn";

import { ActiveSessionContextProvider } from "./context";
import { WalkingMap } from "./map";
import { Panel } from "./panel";

// Unofficial font, https://github.com/jglim/IdentityFont
const ltaIdentity = localFont({
  src: "../../../../.fonts/lta-identity/font.woff2",
  display: "swap",
  variable: "--lta",
});

export default function Page() {
  return (
    <div className={cn("fixed inset-0", ltaIdentity.variable)}>
      <ActiveSessionContextProvider>
        <WalkingMap />
        <Panel />
      </ActiveSessionContextProvider>
    </div>
  );
}

export const metadata: Metadata = makeMetadata("walking-on-singapore-mrt-lines");
export const revalidate = 0;
export const runtime = "edge";
