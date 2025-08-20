"use client";

import Form from "next/form";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variants={{ variant: "primary" }} disabled={disabled || pending}>
      Search
    </Button>
  );
}

export function SearchForm({ query }: { query: string | undefined }) {
  const [value, setValue] = useState(query ?? "");

  return (
    <Form action="" className="flex flex-row gap-3">
      <div className="grow">
        <Input
          placeholder="Anime title"
          name="s"
          value={value}
          onValueChange={setValue}
          spellCheck={false}
        />
      </div>
      <SubmitButton disabled={!value} />
    </Form>
  );
}
