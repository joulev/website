"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "~/lib/cn";

function WorkArea({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "grid h-64 place-items-center rounded border border-dashed border-text-tertiary text-text-secondary",
        className,
      )}
      {...props}
    />
  );
}

export default function Page() {
  const router = useRouter();
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function handleUpload(file: File) {
    try {
      setIsUploading(true);
      const WE_MESSED_UP = new Error("Failed to upload, please try again.");
      const getPresignedUrlRes = await fetch("/admin/upload/generate-presigned-url", {
        method: "POST",
      });
      if (!getPresignedUrlRes.ok) throw WE_MESSED_UP;
      const { url: presignedUrl, key } = (await getPresignedUrlRes.json()) as {
        url: string;
        key: string;
      };
      const uploadRes = await fetch(presignedUrl, { method: "PUT", body: file });
      if (!uploadRes.ok) throw WE_MESSED_UP;
      router.push(`/admin/upload/success?key=${key}`);
    } catch (e) {
      setError((e as Error).message);
      setIsUploading(false);
    }
  }
  useEffect(() => {
    async function onPaste(e: ClipboardEvent) {
      const file = e.clipboardData?.files[0];
      if (!file) return;
      await handleUpload(file);
    }
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  });
  return (
    <>
      {isUploading ? (
        <WorkArea className="cursor-default">Uploading file&hellip;</WorkArea>
      ) : (
        <WorkArea
          className={cn(isDragOver && "bg-bg-active")}
          onDragEnter={e => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={e => {
            e.preventDefault();
            setIsDragOver(false);
          }}
          onDragOver={e => e.preventDefault()}
          onDrop={async e => {
            e.preventDefault();
            setIsDragOver(false);
            const file = e.dataTransfer.files[0];
            await handleUpload(file);
          }}
        >
          {isDragOver ? (
            "Drop the file here"
          ) : (
            <div className="text-center">
              Drag the (one) file here, or
              <br />
              <label>
                <span className="link cursor-pointer">click here to select the file</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={async e => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    await handleUpload(file);
                  }}
                />
              </label>
              ,
              <br />
              or paste the file to upload.
            </div>
          )}
        </WorkArea>
      )}
      {error ? (
        <div className="text-sm text-red">
          <span className="font-bold">Error:</span> {error}
        </div>
      ) : null}
    </>
  );
}
