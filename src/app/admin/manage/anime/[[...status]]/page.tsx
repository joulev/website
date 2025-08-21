import { notFound } from "next/navigation";
import { PageClient } from "./page-client";

export default async function Page(props: PageProps<"/admin/manage/anime/[[...status]]">) {
  const status = (await props.params).status || (await props.searchParams).status;
  if (!status) return notFound();
  const statusArray = Array.isArray(status) ? status : [status];
  return <PageClient status={statusArray} />;
}

export function generateStaticParams(): Awaited<
  PageProps<"/admin/manage/anime/[[...status]]">["params"]
>[] {
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
