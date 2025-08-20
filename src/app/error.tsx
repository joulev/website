"use client";
import { usePathname } from "next/navigation";
import { useLogger } from "next-axiom";
import { LogLevel } from "next-axiom/dist/logger";
import type { ErrorProps } from "./$types";
import Image500 from "./500.webp";

export default function ErrorComponent({ error, reset }: ErrorProps) {
  const pathname = usePathname();
  const log = useLogger({ source: "error.tsx" });
  log.logHttpRequest(
    LogLevel.error,
    error.message,
    { host: window.location.href, path: pathname, statusCode: 500 },
    { error: error.name, cause: error.cause, stack: error.stack, digest: error.digest },
  );
  return (
    <>
      <img
        src={Image500.src}
        className="h-48 mx-auto mb-4 mt-[calc(50dvh-(192px+16px+24px)/2)]"
        alt="500 Internal Server Error"
      />
      <div className="fixed bottom-0 inset-x-0 border-t border-separator bg-bg-darker p-6 backdrop-blur text-sm text-text-secondary flex flex-col gap-2 [&_a]:error-page-link [&_button]:error-page-link">
        <p>
          Something happened that made the web app crash. The below might have some helpful info.{" "}
          <button className="group whitespace-nowrap" type="button" onClick={() => reset()}>
            Attempt to recover
            <span className="group-hover:translate-x-0.5 transition inline-block">&nbsp;→</span>
          </button>
        </p>
        <p>
          <strong className="text-text-primary mr-2">Error:</strong>{" "}
          {error.digest ? (
            <span className="text-text-primary mr-2">Digest {error.digest} </span>
          ) : null}
          <code>{error.message}</code>
        </p>
        <p>
          500 Internal Server Error image by{" "}
          <a
            href="https://github.com/SAWARATSUKI/KawaiiLogos/blob/b4d112887f2161e4c54d82d30586a62caff48633/ResponseCode/500%20InternalServerError.png"
            target="_blank"
            rel="noreferrer noopener"
          >
            SAWARATSUKI
          </a>
        </p>
      </div>
    </>
  );
}
