import NextLink from "next/link";
import { forwardRef } from "react";

import { cn } from "~/lib/cn";

export const Link = forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof NextLink> & { href: string; unstyled?: boolean }
>(function Link({ href, className, unstyled, ...rest }, ref) {
  const isExternal = href.startsWith("http");
  return (
    <NextLink
      href={href}
      className={cn(
        unstyled ||
          "rounded-[4px] font-semibold text-cyan transition hover:bg-bg-idle hover:[box-shadow:0_0_0_4px_var(--bg-idle)] active:bg-bg-active active:[box-shadow:0_0_0_4px_var(--bg-active)]",
        // "[box-shadow:0_0_0_4px_transparent]", // this gave the behaviour I wanted, but removing it makes the thing even better
        className,
      )}
      {...rest}
      {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      ref={ref}
    />
  );
});
