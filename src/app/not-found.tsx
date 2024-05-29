import Link from "next/link";
import Image404 from "./404.webp";

export default function NotFound() {
  return (
    <>
      <img
        src={Image404.src}
        className="h-48 mx-auto mb-4 mt-[calc(50dvh-(192px+16px+24px)/2)]"
        alt="404 Not Found"
      />
      <div className="fixed bottom-0 inset-x-0 border-t border-separator bg-bg-darker p-6 backdrop-blur text-sm text-text-secondary flex flex-col gap-2 [&_a]:error-page-link">
        <p>
          The page you tried to access could not be found.{" "}
          <Link href="/" className="group whitespace-nowrap">
            Go back to the home page
            <span className="group-hover:translate-x-0.5 transition inline-block">&nbsp;→</span>
          </Link>
        </p>
        <p>
          404 Not Found image by{" "}
          <a
            href="https://github.com/SAWARATSUKI/KawaiiLogos/blob/b4d112887f2161e4c54d82d30586a62caff48633/ResponseCode/404%20NotFound.png"
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
