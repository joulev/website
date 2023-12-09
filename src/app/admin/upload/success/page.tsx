import { redirect } from "next/navigation";

import { CopyButton } from "~/components/copy-button";
import { Plus } from "~/components/icons";
import { LinkButton } from "~/components/ui/button";
import { Link } from "~/components/ui/link";

import type { PageProps } from "./$types";

export default function Page({ searchParams }: PageProps) {
  const key = searchParams.key;
  if (typeof key !== "string" || key.length === 0) redirect("/admin/upload");
  const url = `https://r2.joulev.dev/${key}`;
  return (
    <>
      <div>The file has been uploaded successfully:</div>
      <div className="recessed select-all truncate rounded bg-bg-darker p-6 text-center">
        <Link href={url}>{url}</Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <CopyButton className="w-full" content={url} />
        <LinkButton href="/admin/upload" className="w-full">
          <Plus />
          Upload a new file
        </LinkButton>
      </div>
    </>
  );
}

export const runtime = "edge";
