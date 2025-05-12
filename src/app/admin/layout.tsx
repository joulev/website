import type { Metadata } from "next";
import { getSession } from "~/lib/auth/helpers";
import { getMetadata } from "~/lib/seo";
import { Navigation } from "./layout.client";

export default async function Layout({ children }: { children: React.ReactNode }) {
  await getSession();
  return (
    <>
      <div className="pb-12 pt-[152px]">{children}</div>
      <Navigation />
    </>
  );
}

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  ...getMetadata({
    title: "joulev.dev » Admin portal",
    description: "Internal",
    url: "/admin",
  }),
};

export const runtime = "edge";
