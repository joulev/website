"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import { forwardRef } from "react";

import { cn } from "~/lib/cn";

const Progress = forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-1 w-full overflow-hidden rounded-full bg-bg-idle", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 rounded-full bg-text-secondary transition-all"
      style={{
        transform: value ? `translateX(-${100 - value * 100}%)` : `translateX(calc(-100% + 4px))`,
      }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
