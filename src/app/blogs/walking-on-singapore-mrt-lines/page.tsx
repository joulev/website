import type { Metadata } from "next";
import { Suspense } from "react";

import { makeMetadata } from "~/lib/blogs/utils";

import { ActiveSessionContextProvider } from "./context";
import { LoadingScreen } from "./loading-screen";
import { Map } from "./map";
import { Panel } from "./panel";

export default function Page() {
  return (
    <div className="fixed inset-0">
      <Suspense fallback={<LoadingScreen />}>
        <ActiveSessionContextProvider>
          <Map />
          <Panel />
        </ActiveSessionContextProvider>
      </Suspense>
    </div>
  );
}

export const metadata: Metadata = makeMetadata("walking-on-singapore-mrt-lines");
