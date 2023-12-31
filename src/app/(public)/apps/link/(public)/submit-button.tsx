"use client";

import { useFormStatus } from "react-dom";

import { Button } from "~/components/ui/button";

export function SubmitButton({ isValid }: { isValid: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variants={{ variant: "primary" }}
      className="w-full"
      disabled={!isValid || pending}
    >
      {pending ? <>Working on it&hellip;</> : "Shorten URL"}
    </Button>
  );
}
