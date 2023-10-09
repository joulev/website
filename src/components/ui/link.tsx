import NextLink from "next/link";
import { forwardRef } from "react";

import { cn } from "~/lib/cn";

export const Link = forwardRef<HTMLAnchorElement, React.ComponentPropsWithoutRef<typeof NextLink>>(
  function Link({ className, ...rest }, ref) {
    return (
      <NextLink
        className={cn(
          "text-cyan rounded-[4px] font-semibold transition hover:bg-bg-idle hover:[box-shadow:0_0_0_4px_var(--bg-idle)]",
          // "[box-shadow:0_0_0_4px_transparent]", // this gave the behaviour I wanted, but removing it makes the thing even better
          className,
        )}
        {...rest}
        ref={ref}
      />
    );
  },
);
