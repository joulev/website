import type { MDXComponents } from "mdx/types";

import * as customComponents from "~/components/blogs/mdx";
import { Tweet } from "~/components/ui/tweet";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...customComponents,
    Tweet: ({ id }: { id: string }) => <Tweet id={id} className="my-8" />,
  };
}
