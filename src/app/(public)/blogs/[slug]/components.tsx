export function Figure(props: React.ComponentProps<"figure">) {
  return (
    <figure
      {...props}
      className="data-[rehype-pretty-code-figure]:-mx-[--p] data-[rehype-pretty-code-figure]:max-w-none data-[rehype-pretty-code-figure]:bg-bg-darker data-[rehype-pretty-code-figure]:px-[--p]"
    />
  );
}

export function Pre(props: React.ComponentProps<"pre">) {
  return <pre {...props} className="mx-auto max-w-prose rounded-none bg-transparent px-0 py-3" />;
}
