"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useTransitionWithNProgress } from "~/lib/hooks/use-nprogress";

export function SearchForm({ query }: { query: string | undefined }) {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(query ?? "");
  const startTransition = useTransitionWithNProgress();

  return (
    <form
      className="flex flex-row gap-3"
      onSubmit={e => {
        e.preventDefault();
        if (value)
          startTransition(() => router.replace(`${pathname}?s=${encodeURIComponent(value)}`));
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
      <Button type="submit" variants={{ variant: "primary" }} disabled={!value}>
        Search
      </Button>
    </form>
  );
}
