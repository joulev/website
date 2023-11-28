"use client";

import { usePathname, useRouter } from "next/navigation";
import nProgress from "nprogress";
import { useEffect, useState } from "react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export function SearchForm({ query }: { query: string | undefined }) {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(query ?? "");

  useEffect(() => {
    if (value === query) nProgress.done();
  }, [value, query]);

  return (
    <form
      className="flex flex-row gap-3"
      onSubmit={e => {
        e.preventDefault();
        if (value) {
          nProgress.start();
          router.replace(`${pathname}?s=${encodeURIComponent(value)}`);
        }
      }}
    >
      <div className="flex-grow">
        <Input
          placeholder="Anime title"
          value={value}
          onValueChange={setValue}
          spellCheck={false}
        />
      </div>
      <Button variants={{ variant: "primary" }} disabled={!value}>
        Search
      </Button>
    </form>
  );
}
