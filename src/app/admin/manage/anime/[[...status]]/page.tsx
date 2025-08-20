import { PageClient } from "./page-client";

export default async function Page({ params }: PageProps<"/admin/manage/anime/[[...status]]">) {
  return <PageClient status={(await params).status} />;
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
