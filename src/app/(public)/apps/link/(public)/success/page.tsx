import { redirect } from "next/navigation";

import { CopyButton } from "~/components/copy-button";
import { Plus } from "~/components/icons";
import { LinkButton } from "~/components/ui/button";
import { Link } from "~/components/ui/link";

import type { PageProps } from "./$types";

export default function Page({ searchParams }: PageProps) {
  const slug = searchParams.slug;
  if (typeof slug !== "string" || slug.length === 0) redirect("/apps/link");
  const url = `https://l.joulev.dev/${slug}`;
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>Your short link has been created successfully:</div>
      <div className="recessed select-all truncate rounded bg-bg-darker p-6 text-center">
        <Link href={url}>{url}</Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <CopyButton className="w-full" content={url} />
        <LinkButton href="/apps/link" className="w-full">
          <Plus />
          Shorten a new link
        </LinkButton>
      </div>
    </div>
  );
}

export const runtime = "edge";
