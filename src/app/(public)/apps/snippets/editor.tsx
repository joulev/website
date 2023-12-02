"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import type { Lang } from "shiki";

import { ShikiEditor } from "~/components/shiki-editor";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { createSnippet } from "./create-snippet-action";

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full sm:w-auto"
      variants={{ variant: "primary" }}
      disabled={pending}
    >
      Save
    </Button>
  );
}

export function Editor() {
  const [code, setCode] = useState("");
  const [tabSize, setTabSize] = useState(2);
  const [language, setLanguage] = useState<Lang>("tsx");
  return (
    <form action={createSnippet} className="flex flex-col">
      <input type="hidden" name="language" value={language} />
      <ShikiEditor
        name="code"
        theme="/editor-theme"
        language={language}
        tabSize={tabSize}
        value={code}
        onChange={setCode}
      />
      <div className="flex flex-col gap-3 p-6 sm:flex-row sm:justify-between">
        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-row">
          <Select value={language} onValueChange={val => setLanguage(val as Lang)}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent className="max-h-56">
              <SelectGroup>
                <SelectLabel>Languages</SelectLabel>
                <SelectItem value="plaintext">Plain text</SelectItem>
                <SelectItem value="astro">Astro</SelectItem>
                <SelectItem value="cpp">C/C++</SelectItem>
                <SelectItem value="csharp">C#</SelectItem>
                <SelectItem value="css">CSS</SelectItem>
                <SelectItem value="dart">Dart</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="graphql">Graphql</SelectItem>
                <SelectItem value="haskell">Haskell</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="tsx">JS/TS</SelectItem>
                <SelectItem value="json5">JSON</SelectItem>
                <SelectItem value="julia">Julia</SelectItem>
                <SelectItem value="kotlin">Kotlin</SelectItem>
                <SelectItem value="tex">LaTeX/TeX</SelectItem>
                <SelectItem value="perl">Perl</SelectItem>
                <SelectItem value="php">PHP</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="ruby">Ruby</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
                <SelectItem value="svelte">Svelte</SelectItem>
                <SelectItem value="swift">Swift</SelectItem>
                <SelectItem value="vue">Vue</SelectItem>
                <SelectItem value="xml">XML</SelectItem>
                <SelectItem value="yaml">YAML</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={tabSize.toString()} onValueChange={val => setTabSize(parseInt(val))}>
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue placeholder="Select tabsize" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tab sizes</SelectLabel>
                <SelectItem value="2">Tab size: 2</SelectItem>
                <SelectItem value="4">Tab size: 4</SelectItem>
                <SelectItem value="8">Tab size: 8</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <SaveButton />
      </div>
    </form>
  );
}
