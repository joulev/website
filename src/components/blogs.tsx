import { Link } from "~/components/ui/link";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { cn } from "~/lib/cn";

function Heading({
  level,
  id,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"h1"> & { level: 1 | 2 | 3 | 4 | 5 | 6 }) {
  const Tag = `h${level}` as const;
  return (
    <Tag id={id} {...props} className="scroll-mt-36">
      <a href={`#${id}`} className="not-prose group relative">
        <span
          aria-hidden="true"
          className="absolute right-full not-sr-only w-4 translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition"
        >
          <span className="text-lg font-mono font-normal text-text-tertiary hover:text-text-secondary transition before:content-['#']" />
        </span>
        {children}
      </a>
    </Tag>
  );
}

export const h1 = (props: React.ComponentPropsWithoutRef<"h1">) => <Heading level={1} {...props} />;
export const h2 = (props: React.ComponentPropsWithoutRef<"h2">) => <Heading level={2} {...props} />;
export const h3 = (props: React.ComponentPropsWithoutRef<"h3">) => <Heading level={3} {...props} />;
export const h4 = (props: React.ComponentPropsWithoutRef<"h4">) => <Heading level={4} {...props} />;
export const h5 = (props: React.ComponentPropsWithoutRef<"h5">) => <Heading level={5} {...props} />;
export const h6 = (props: React.ComponentPropsWithoutRef<"h6">) => <Heading level={6} {...props} />;

export function a({ href, className, ...props }: React.ComponentPropsWithoutRef<"a">) {
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
    // These overflow-y-hidden are needed to prevent y-direction scrolling, which doesn't occur on
    // Chromium-based browsers and Safari, but somehow shows up on Firefox. Why it even shows up, I
    // don't know...
    <ScrollArea
      className="-mx-[--p] blog-lg:max-w-[--lg-max-width] overflow-x-auto overflow-y-hidden px-0 py-3"
      style={{
        "--lg-max-width": "calc(var(--prose-width) + 2 * var(--p))",
        "--inner-left-margin": "max(calc((100vw - 3rem - var(--prose-width)) / 2), var(--p))",
      }}
    >
      <pre
        {...props}
        className="m-0 ml-[--inner-left-margin] blog-lg:ml-[--p] overflow-y-hidden rounded-none bg-transparent p-0"
      />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export function code({ className, ...props }: React.ComponentPropsWithoutRef<"code">) {
  return (
    <code
      {...props}
      className={cn(
        "mx-1 bg-bg-darker [box-shadow:0_0_0_4px_var(--bg-darker)] rounded-[4px] [font-weight:inherit] before:content-[''] after:content-[''] [pre_&]:rounded-none [pre_&]:bg-transparent [pre_&]:p-0 [pre_&]:mx-0 [pre_&]:[box-shadow:none]",
        className,
      )}
    />
  );
}

export function hr(props: React.ComponentPropsWithoutRef<"hr">) {
  return <hr {...props} className="!-mx-[--p] !max-w-none" />;
}
