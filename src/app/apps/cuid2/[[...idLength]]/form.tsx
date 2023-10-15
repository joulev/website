"use client";

import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export function Form({ initialValue }: { initialValue: number }) {
  const router = useRouter();
  const [value, setValue] = useState(initialValue);
  return (
    <form
      className="flex flex-row gap-6"
      onSubmit={e => {
        e.preventDefault();
        if (value === initialValue) startTransition(() => router.refresh());
        else startTransition(() => router.push(`/apps/cuid2/${value}`));
      }}
    >
      <div className="flex-grow sm:w-36 sm:flex-grow-0">
        <Input
          required
          type="number"
          placeholder="Length"
          value={String(value)}
          onValueChange={v => setValue(parseInt(v))}
        />
      </div>
      <Button type="submit">Generate</Button>
    </form>
  );
}
