import { forwardRef } from "react";

import { cn } from "~/lib/cn";

export const Card = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(function Card(
  { className, children, ...rest },
  ref,
) {
  return (
    <div
      className={cn(
        "card overflow-hidden rounded-full bg-bg-idle p-6 backdrop-blur transition",
        className,
      )}
      {...rest}
      ref={ref}
    >
      {children}
    </div>
  );
});
