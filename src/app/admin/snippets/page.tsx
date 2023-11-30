"use client";

import { useState } from "react";
import type { Lang } from "shiki";

import { ShikiEditor } from "~/components/shiki-editor";
import { Title } from "~/components/title";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function Page() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<Lang>("tsx");
  return (
    <main className="container max-w-screen-md">
      <Card className="flex flex-col p-0">
        <div className="bg-bg-darker py-6">
          <div className="container flex max-w-screen-md flex-col gap-6">
            <Title title="snippets" subtitle="Upload short code snippets here." />
          </div>
        </div>
        <div className="flex flex-col">
          <ShikiEditor
            theme="/admin/snippets/get-theme"
            language={language}
            value={code}
            onChange={setCode}
          />
          <div className="flex flex-col gap-3 p-6 sm:flex-row sm:justify-between">
            <div>
              <Select value={language} onValueChange={val => setLanguage(val as Lang)}>
                <SelectTrigger className="w-full sm:w-64">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {/* <SelectLabel>Preloaded</SelectLabel> */}
                    <SelectItem value="plaintext">Plain text</SelectItem>
                    <SelectItem value="tsx">TypeScript JSX</SelectItem>
                    <SelectItem value="css">CSS</SelectItem>
                    <SelectItem value="html">HTML</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                  </SelectGroup>
                  {/* <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Others (none for now)</SelectLabel>
                  </SelectGroup> */}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-row">
              <Button className="w-full sm:w-auto" onClick={() => setCode("")}>
                Clear
              </Button>
              <Button className="w-full sm:w-auto" variants={{ variant: "primary" }}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </main>
  );
}
