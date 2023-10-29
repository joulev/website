import type { Metadata } from "next";
import { notFound } from "next/navigation";

import type { PageProps, Params } from "./$types";

export default function Page({ params }: PageProps) {
  const status = params.status?.join("/") ?? "watching";
  if (
    status !== "watching" &&
    status !== "rewatching" &&
    status !== "completed/tv" &&
    status !== "completed/movies" &&
    status !== "completed/others" &&
    status !== "paused" &&
    status !== "dropped" &&
    status !== "planning"
  )
    notFound();

  return status;
}

export function generateMetadata({ params }: PageProps): Metadata {
  const status = params.status?.join("/") ?? "watching";
  switch (status) {
    case "watching":
      return { title: "Watching" };
    case "rewatching":
      return { title: "Rewatching" };
    case "completed/tv":
      return { title: "Completed TV" };
    case "completed/movies":
      return { title: "Completed Movies" };
    case "completed/others":
      return { title: "Completed (others)" };
    case "paused":
      return { title: "Paused" };
    case "dropped":
      return { title: "Dropped" };
    case "planning":
      return { title: "Planning" };
    default:
      // Next.js *should* not reach this branch, but it does, so ah well...
      return { title: "404" };
  }
}

export function generateStaticParams(): Params[] {
  return [
    { status: [] },
    { status: ["watching"] },
    { status: ["rewatching"] },
    { status: ["completed", "tv"] },
    { status: ["completed", "movies"] },
    { status: ["completed", "others"] },
    { status: ["paused"] },
    { status: ["dropped"] },
    { status: ["planning"] },
  ];
}

export const dynamicParams = false;
