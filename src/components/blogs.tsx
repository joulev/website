import { Link } from "~/components/ui/link";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { cn } from "~/lib/cn";

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
