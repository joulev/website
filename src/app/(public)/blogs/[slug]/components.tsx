"use client";

import { useState } from "react";

import { Link } from "~/components/ui/link";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Slider } from "~/components/ui/slider";
import { cn } from "~/lib/cn";

export { ChevronsRight } from "~/components/icons";

export function a({ href, className, ...props }: React.ComponentPropsWithoutRef<"a">) {
  // eslint-disable-next-line jsx-a11y/anchor-has-content -- content is passed as children
  if (!href) return <a {...props} className={cn("link", className)} />;
  return <Link href={href} {...props} className={className} />;
}

export function figure(props: React.ComponentPropsWithoutRef<"figure">) {
  return (
    <figure
      {...props}
      className="!-mx-[--p] !max-w-none bg-bg-darker data-[rehype-pretty-code-figure]:px-[--p]"
    />
  );
}

export const Figure = figure;

export function pre(props: React.ComponentPropsWithoutRef<"pre">) {
  return (
    <ScrollArea className="mx-auto max-w-prose overflow-x-auto px-0 py-3">
      <pre {...props} className="m-0 rounded-none bg-transparent p-0" />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export function code({ className, ...props }: React.ComponentPropsWithoutRef<"code">) {
  return <code {...props} className={cn("font-normal", className)} />;
}

// Article-specific components. Temporarily here until I figure out how to import them directly to
// *.mdx files (currently direct import doesn't work)

export function LucideIconOpacityDemo() {
  const [opacity, setOpacity] = useState(0.3);
  return (
    <div className="flex flex-col items-center justify-center gap-x-18 gap-y-6 py-6 md:flex-row">
      <div className="grid grid-cols-2 divide-x divide-separator">
        <div className="flex flex-col items-center gap-3 pr-6">
          <svg
            className="h-24 w-24"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentcolor"
            strokeOpacity={opacity}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
            <path d="M8.5 2h7" />
            <path d="M7 16h10" />
            <circle
              cx="17"
              cy="16"
              r="3"
              className={cn(
                opacity > 0 && opacity < 0.7 ? "stroke-red" : "stroke-transparent",
                "transition",
              )}
              strokeOpacity={1}
              strokeWidth={0.5}
            />
          </svg>
          <Link href="https://lucide.dev/icons/flask-conical" className="font-mono sm:text-lg">
            flask-conical
          </Link>
        </div>
        <div className="flex flex-col items-center gap-3 pl-6">
          <svg
            className="h-24 w-24"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentcolor"
            strokeOpacity={opacity}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="1" />
            <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
            <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
            <circle
              cx="12"
              cy="5.3"
              r="3"
              className={cn(
                opacity > 0 && opacity < 0.7 ? "stroke-red" : "stroke-transparent",
                "transition",
              )}
              strokeOpacity={1}
              strokeWidth={0.5}
            />
          </svg>
          <Link href="https://lucide.dev/icons/atom" className="font-mono sm:text-lg">
            atom
          </Link>
        </div>
      </div>
      <div className="flex flex-row items-center gap-x-6 gap-y-3 md:flex-col-reverse md:items-start">
        <Slider
          max={1}
          step={0.1}
          value={[opacity]}
          onValueChange={values => setOpacity(values[0])}
          className="w-36 sm:w-48"
        />
        <div className="font-mono text-sm">
          <span className="text-text-secondary">opacity = </span>
          {opacity.toFixed(1)}
        </div>
      </div>
    </div>
  );
}

export function LucideIconFlaskConicalFlatteningDemo() {
  const [opacity, setOpacity] = useState(0.3);
  return (
    <div className="flex flex-col items-center justify-center gap-x-18 gap-y-6 py-6 md:flex-row">
      <div className="grid grid-cols-2 divide-x divide-separator">
        <div className="flex flex-col items-center gap-3 pr-6">
          <svg
            className="h-24 w-24"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentcolor"
            strokeOpacity={opacity}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
            <path d="M8.5 2h7" />
            <path d="M7 16h10" />
            <circle
              cx="17"
              cy="16"
              r="3"
              className={cn(
                opacity > 0 && opacity < 0.7 ? "stroke-red" : "stroke-transparent",
                "transition",
              )}
              strokeOpacity={1}
              strokeWidth={0.5}
            />
          </svg>
          <div className="text-lg">Original</div>
        </div>
        <div className="flex flex-col items-center gap-3 pl-6">
          <svg
            className="h-24 w-24"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentcolor"
            strokeOpacity={opacity}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2M8.5 2h7M7 16h10" />
          </svg>
          <div className="text-lg">Flattened ✅</div>
        </div>
      </div>
      <div className="flex flex-row items-center gap-x-6 gap-y-3 md:flex-col-reverse md:items-start">
        <Slider
          max={1}
          step={0.1}
          value={[opacity]}
          onValueChange={values => setOpacity(values[0])}
          className="w-36 sm:w-48"
        />
        <div className="font-mono text-sm">
          <span className="text-text-secondary">opacity = </span>
          {opacity.toFixed(1)}
        </div>
      </div>
    </div>
  );
}

export function LucideIconAtomReallyFlatteningDemo() {
  const [opacity, setOpacity] = useState(0.3);
  return (
    <div className="flex flex-col items-center justify-center gap-x-18 gap-y-6 py-6 md:flex-row">
      <div className="grid grid-cols-2 divide-x divide-separator">
        <div className="flex flex-col items-center gap-3 pr-6">
          <svg
            className="h-24 w-24"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentcolor"
            strokeOpacity={opacity}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="1" />
            <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
            <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
            <circle
              cx="12"
              cy="5.3"
              r="3"
              className={cn(
                opacity > 0 && opacity < 0.7 ? "stroke-red" : "stroke-transparent",
                "transition",
              )}
              strokeOpacity={1}
              strokeWidth={0.5}
            />
          </svg>
          <div className="flex flex-col items-center">
            <span className="text-lg">Original</span>
            <span className="text-sm text-text-secondary">(with stroke)</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 pl-6">
          <svg
            className="h-24 w-24"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="none"
          >
            <path
              fill="currentcolor"
              fillOpacity={opacity}
              d="M10 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"
            />
            <path
              fill="currentcolor"
              fillOpacity={opacity}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 4.076a16.77 16.77 0 0 1 2.837-1.421c1.156-.438 2.29-.68 3.317-.648 1.034.033 2.018.349 2.753 1.086.737.735 1.053 1.719 1.086 2.753.032 1.028-.21 2.161-.648 3.317-.346.914-.824 1.87-1.42 2.837a16.765 16.765 0 0 1 1.42 2.837c.438 1.156.68 2.29.648 3.317-.033 1.034-.349 2.018-1.086 2.753-.735.737-1.719 1.053-2.753 1.086-1.028.032-2.161-.21-3.317-.648A16.765 16.765 0 0 1 12 19.925a16.764 16.764 0 0 1-2.837 1.42c-1.156.438-2.29.68-3.317.648-1.034-.033-2.019-.349-2.753-1.086-.737-.735-1.053-1.719-1.086-2.753-.032-1.028.21-2.161.648-3.317A16.77 16.77 0 0 1 4.075 12a16.769 16.769 0 0 1-1.42-2.837c-.438-1.156-.68-2.29-.648-3.317.033-1.034.349-2.018 1.086-2.753.735-.737 1.719-1.053 2.753-1.086 1.028-.032 2.161.21 3.317.648.914.346 1.87.824 2.837 1.42Zm1.82 1.254a26.157 26.157 0 0 1 2.586 2.261l.003.003a26.16 26.16 0 0 1 2.262 2.587c.326-.596.595-1.175.804-1.726.377-.998.54-1.862.519-2.546-.022-.677-.218-1.12-.5-1.4l-.003-.004c-.28-.281-.723-.477-1.4-.499-.684-.021-1.548.142-2.546.52-.551.208-1.13.477-1.726.804Zm-8.49 4.85a13.704 13.704 0 0 1-.805-1.725c-.377-.998-.54-1.862-.519-2.546.022-.677.218-1.12.5-1.4l.003-.004c.28-.281.723-.477 1.4-.499.684-.021 1.548.142 2.546.52.551.208 1.13.477 1.726.804A26.149 26.149 0 0 0 7.594 7.59l-.003.003c-.835.84-1.593 1.71-2.261 2.587ZM6.474 12A23.677 23.677 0 0 1 12 6.474 23.677 23.677 0 0 1 17.526 12 23.68 23.68 0 0 1 12 17.526 23.685 23.685 0 0 1 6.474 12ZM5.33 13.82a13.704 13.704 0 0 0-.805 1.725c-.377.998-.54 1.862-.519 2.546.022.677.218 1.12.5 1.4l.003.004c.28.281.723.477 1.4.499.684.021 1.548-.142 2.546-.52.551-.208 1.13-.477 1.726-.803a26.16 26.16 0 0 1-2.587-2.262l-.003-.003a26.157 26.157 0 0 1-2.261-2.587Zm8.49 4.85c.595.327 1.174.596 1.725.805.998.377 1.862.54 2.546.519.677-.022 1.12-.218 1.4-.5l.004-.003c.281-.28.477-.723.499-1.4.021-.684-.142-1.548-.52-2.546a13.709 13.709 0 0 0-.803-1.726 26.168 26.168 0 0 1-2.262 2.587l-.003.003c-.84.835-1.71 1.593-2.587 2.262Z"
            />
          </svg>
          <div className="flex flex-col items-center">
            <span className="text-lg">Flattened ✅</span>
            <span className="text-sm text-text-secondary">(but with fill)</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center gap-x-6 gap-y-3 md:flex-col-reverse md:items-start">
        <Slider
          max={1}
          step={0.1}
          value={[opacity]}
          onValueChange={values => setOpacity(values[0])}
          className="w-36 sm:w-48"
        />
        <div className="font-mono text-sm">
          <span className="text-text-secondary">opacity = </span>
          {opacity.toFixed(1)}
        </div>
      </div>
    </div>
  );
}

export function LucideIconAtomMaskDemo() {
  const [opacity, setOpacity] = useState(0.3);
  return (
    <div className="flex flex-col items-center justify-center gap-x-18 gap-y-6 py-6 md:flex-row">
      <div className="grid grid-cols-2 divide-x divide-separator">
        <div className="flex flex-col items-center gap-3 pr-6">
          <svg
            className="h-24 w-24"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentcolor"
            strokeOpacity={opacity}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="1" />
            <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
            <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
            <circle
              cx="12"
              cy="5.3"
              r="3"
              className={cn(
                opacity > 0 && opacity < 0.7 ? "stroke-red" : "stroke-transparent",
                "transition",
              )}
              strokeOpacity={1}
              strokeWidth={0.5}
            />
          </svg>
          <div className="text-lg">Original</div>
        </div>
        <div className="flex flex-col items-center gap-3 pl-6">
          <svg
            className="h-24 w-24"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <mask id="a">
              <rect width="24" height="24" fill="black" />
              <circle stroke="white" cx="12" cy="12" r="1" />
              <path
                stroke="white"
                d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"
              />
              <path
                stroke="white"
                d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"
              />
            </mask>
            <rect width="24" height="24" fill="currentcolor" fillOpacity={opacity} mask="url(#a)" />
          </svg>
          <div className="text-lg">Masked ✅</div>
        </div>
      </div>
      <div className="flex flex-row items-center gap-x-6 gap-y-3 md:flex-col-reverse md:items-start">
        <Slider
          max={1}
          step={0.1}
          value={[opacity]}
          onValueChange={values => setOpacity(values[0])}
          className="w-36 sm:w-48"
        />
        <div className="font-mono text-sm">
          <span className="text-text-secondary">opacity = </span>
          {opacity.toFixed(1)}
        </div>
      </div>
    </div>
  );
}

export function LucideIconAtomMaskCustomiseStrokeWidthDemo() {
  const [strokeWidth, setStrokeWidth] = useState(2);
  return (
    <div className="flex flex-col items-center justify-center gap-x-18 gap-y-6 py-6 md:flex-row">
      <div className="grid grid-cols-2 divide-x divide-separator">
        <div className="flex flex-col items-center gap-3 pr-6">
          <svg
            className="h-24 w-24"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentcolor"
            strokeOpacity={0.3}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="1" />
            <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
            <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
            <circle
              cx="12"
              cy="5.3"
              r="3"
              className="stroke-red transition"
              strokeOpacity={1}
              strokeWidth={0.5}
            />
          </svg>
          <div className="text-lg">Original</div>
        </div>
        <div className="flex flex-col items-center gap-3 pl-6">
          <svg
            className="h-24 w-24"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <mask id="a">
              <rect width="24" height="24" fill="black" />
              <circle stroke="white" cx="12" cy="12" r="1" />
              <path
                stroke="white"
                d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"
              />
              <path
                stroke="white"
                d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"
              />
            </mask>
            <rect width="24" height="24" fill="currentcolor" fillOpacity={0.3} mask="url(#a)" />
          </svg>
          <div className="text-lg">Masked ✅</div>
        </div>
      </div>
      <div className="flex flex-row items-center gap-x-6 gap-y-3 md:flex-col-reverse md:items-start">
        <Slider
          max={3}
          min={1}
          step={0.5}
          value={[strokeWidth]}
          onValueChange={values => setStrokeWidth(values[0])}
          className="w-36 sm:w-48"
        />
        <div className="font-mono text-sm">
          <span className="text-text-secondary">width = </span>
          {strokeWidth.toFixed(1)}
        </div>
      </div>
    </div>
  );
}
