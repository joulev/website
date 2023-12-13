"use client";

import { useCopyState } from "~/components/copy-button";
import { Check, Share } from "~/components/icons";
import { Button } from "~/components/ui/button";

export function ShareButton() {
  const { showCopied, copy } = useCopyState();
  return (
    <Button
      variants={{ size: "sm" }}
      onClick={async () => {
        try {
          await navigator.share({ title: document.title, url: window.location.href });
        } catch (e) {
          // User simply cancelled the share, nothing to do here
          if (e instanceof DOMException && e.name === "AbortError") return;
          // Otherwise the share failed, we fallback to copying the link
          await copy(window.location.href);
        }
      }}
    >
      {showCopied ? (
        <>
          <Check /> Link copied!
        </>
      ) : (
        <>
          <Share /> Share
        </>
      )}
    </Button>
  );
}
