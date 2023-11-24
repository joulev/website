"use client";

import { useState } from "react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import type { ShortLink } from "~/lib/db/schema";
import { deletePersonalLink, upsertPersonalLink } from "~/lib/link/handle-personal-links";

export function LinkUpdateModal({
  link,
  children,
}: {
  link: ShortLink | null;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [slug, setSlug] = useState(link?.slug ?? "");
  const [url, setUrl] = useState(link?.url ?? "");
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{link?.slug ?? "Create a new link"}</DialogTitle>
          <DialogDescription>Manage the URL of this short link.</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={async e => {
            e.preventDefault();
            await upsertPersonalLink(link?.id ?? null, { slug, url });
            setIsOpen(false);
          }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-3">
            <Input
              type="text"
              name="slug"
              placeholder="Slug"
              required
              value={slug}
              onValueChange={setSlug}
            />
            <Input
              type="url"
              name="url"
              placeholder="URL"
              required
              value={url}
              onValueChange={setUrl}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="w-full sm:w-auto" variants={{ variant: "ghost" }}>
                Cancel
              </Button>
            </DialogClose>
            {link ? (
              <Button
                className="w-full sm:w-auto"
                onClick={async () => {
                  await deletePersonalLink(link.id);
                  setIsOpen(false);
                }}
              >
                Delete
              </Button>
            ) : null}
            <Button type="submit" className="w-full sm:w-auto" variants={{ variant: "primary" }}>
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
