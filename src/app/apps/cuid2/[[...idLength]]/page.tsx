import { init } from "@paralleldrive/cuid2";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Balancer } from "react-wrap-balancer";

import { Card } from "~/components/ui/card";

import type { PageProps, Params } from "./$types";
import { CopyButton } from "./copy-button";
import { Form } from "./form";

const DEFAULT_LENGTH = 12;
function getLength(params: Params) {
  if (!params.idLength) return DEFAULT_LENGTH;
  if (params.idLength.length !== 1) notFound();
  const length = parseInt(params.idLength[0]);
  if (isNaN(length)) notFound();
  return length;
}

export default function Page({ params }: PageProps) {
  const length = getLength(params);
  const value = init({ length })();
  return (
    <main className="container max-w-screen-md py-24">
      <Card className="flex flex-col p-0">
        <div className="relative break-all bg-bg-darker p-12 pt-[90px] text-center text-3xl sm:p-24 sm:text-5xl">
          <span className="select-all">
            <Balancer>{value}</Balancer>
          </span>
          <div className="absolute right-6 top-6 flex flex-col">
            <CopyButton content={value} />
          </div>
        </div>
        <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
          <div className="flex-shrink-0 flex-grow">Generate a cuid2 string with length:</div>
          <Form initialValue={length} />
        </div>
      </Card>
    </main>
  );
}

const title = "cuid2 at joulev.dev";
const description = "cuid2 generator";
const url = "https://cuid2.joulev.dev";
export const metadata: Metadata = {
  metadataBase: new URL("https://cuid2.joulev.dev"),
  title,
  description,
  twitter: { card: "summary_large_image", creator: "@joulev_3" },
  openGraph: {
    title,
    description,
    url,
    siteName: title,
    images: [
      { url: "https://static.joulev.dev/og?title=cuid2", alt: title, width: 1200, height: 630 },
    ],
    type: "website",
  },
  alternates: { canonical: url },
  icons: {
    icon: [
      { url: "https://static.joulev.dev/images/favicon.svg", type: "image/svg+xml" },
      { url: "https://static.joulev.dev/favicon.ico", type: "image/x-icon", sizes: "any" },
    ],
    apple: [{ url: "https://static.joulev.dev/images/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const runtime = "edge";
export const revalidate = 0;
