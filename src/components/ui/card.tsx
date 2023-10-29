import { forwardRef } from "react";

import { cn } from "~/lib/cn";

export const Card = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(function Card(
  { className, children, ...rest },
  ref,
) {
  return (
    <div
      className={cn(
        "overflow-clip", // overflow-hidden will prevent sticky positioning from working
        "card rounded-full bg-bg-idle p-6 backdrop-blur transition",
        className,
      )}
      {...rest}
      ref={ref}
    >
      {children}
    </div>
  );
});
