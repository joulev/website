import type { Metadata } from "next";
import { Suspense } from "react";

import { makeMetadata } from "~/lib/blogs/utils";

import { ActiveSessionContextProvider } from "./context";
import { LoadingScreen } from "./loading-screen";
import { WalkingMap } from "./map";
import { Panel } from "./panel";

export default function Page() {
  return (
    <div className="fixed inset-0">
      <Suspense fallback={<LoadingScreen />}>
        <ActiveSessionContextProvider>
          <WalkingMap />
          <Panel />
        </ActiveSessionContextProvider>
      </Suspense>
    </div>
  );
}

export const metadata: Metadata = makeMetadata("walking-on-singapore-mrt-lines");
