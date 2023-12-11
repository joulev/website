import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";

export function Figure(props: React.ComponentProps<"figure">) {
  return (
    <figure
      {...props}
      className="data-[rehype-pretty-code-figure]:-mx-[--p] data-[rehype-pretty-code-figure]:max-w-none data-[rehype-pretty-code-figure]:bg-bg-darker data-[rehype-pretty-code-figure]:px-[--p]"
    />
  );
}

export function Pre(props: React.ComponentProps<"pre">) {
  return (
    <ScrollArea className="mx-auto max-w-prose overflow-x-auto px-0 py-3">
      <pre {...props} className="m-0 rounded-none bg-transparent p-0" />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
