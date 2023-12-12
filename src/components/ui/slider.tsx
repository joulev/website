"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import { forwardRef } from "react";

import { cn } from "~/lib/cn";

export const Slider = forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track className="recessed relative flex h-6 w-full grow flex-row overflow-hidden rounded-full bg-bg-darker">
      <div className="w-6" />
      <div className="relative flex-grow">
        <SliderPrimitive.Range className="absolute !-left-6 h-full rounded-full bg-text-secondary shadow-[5px_0px_4px_rgba(0,0,0,0.18)]" />
      </div>
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="group relative block h-6 w-6 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
      <div className="absolute inset-1 rounded-full bg-white transition-all group-focus-visible:inset-1.5 group-focus-visible:shadow-[0px_0px_12px_6px_rgba(255,255,255,0.2)]" />
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;
