import { forwardRef } from "react";

import { cn } from "~/lib/cn";

import styles from "./css/card.module.css";

export const Card = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(function Card(
  { className, children, ...rest },
  ref,
) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-full border bg-bg-idle p-6 backdrop-blur transition",
        styles.card,
        className,
      )}
      {...rest}
      ref={ref}
    >
      {children}
    </div>
  );
});
