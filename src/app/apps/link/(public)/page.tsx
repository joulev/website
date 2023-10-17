"use client";

import { useState } from "react";
import { is as vIs } from "valibot";

import { Input } from "~/components/ui/input";

import { publicCreateLink } from "../actions";
import { publicCreateSchema } from "../schemas";
import { SubmitButton } from "./submit-button";

export default function Page() {
  const [slug, setSlug] = useState("");
  const [url, setUrl] = useState("");
  const isValid = vIs(publicCreateSchema, { slug: slug || undefined, url });
  return (
    <form action={publicCreateLink} className="flex flex-col gap-6 p-6">
      <div className="flex flex-row items-center gap-3">
        <div>https://link.joulev.dev/l/</div>
        <div className="flex-grow">
          <Input
            placeholder="slug (optional)"
            value={slug}
            onValueChange={setSlug}
            name="slug"
            type="text"
            pattern="[a-zA-Z0-9-_]+"
          />
        </div>
      </div>
      <Input
        placeholder="URL to shorten"
        value={url}
        onValueChange={setUrl}
        required
        name="url"
        type="url"
      />
      <SubmitButton isValid={isValid} />
    </form>
  );
}
