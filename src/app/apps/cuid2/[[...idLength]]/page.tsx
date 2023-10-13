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

export const metadata: Metadata = {
  title: "joulev.dev » cuid2",
  description: "Online cuid2 generator",
  openGraph: {
    title: "joulev.dev » cuid2",
    description: "Online cuid2 generator",
    url: "/apps/cuid2",
  },
};

export const runtime = "edge";
export const revalidate = 0;
