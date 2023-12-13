import type { MDXComponents } from "mdx/types";

import * as customComponents from "~/components/blogs";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components, ...customComponents };
}
