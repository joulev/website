"use client";

import { Slot } from "@radix-ui/react-slot";
import type { VariantProps } from "cva";
import { forwardRef } from "react";

import { cn, cva } from "~/lib/cn";

import { useHoverBackground } from "./hooks/use-hover-background";

type BaseProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  asChild?: boolean;
};

export const List = forwardRef<HTMLDivElement, BaseProps<"div">>(function List(
  { asChild, className, ...props },
  ref,
) {
  const Component = asChild ? Slot : "div";
  return <Component {...props} className={cn("flex flex-col gap-3", className)} ref={ref} />;
});

export const ListHeader = forwardRef<HTMLDivElement, BaseProps<"div">>(function ListHeader(
  { asChild, className, ...props },
  ref,
) {
  const Component = asChild ? Slot : "div";
  return <Component {...props} className={cn("px-6 text-lg font-bold", className)} ref={ref} />;
});

const withSeparatorClasses = cn(
  // LOL
  "[&_[data-li]:first-of-type]:border-none [&_[data-li]:hover]:border-transparent [&_[data-li]:hover_+_[data-li]]:border-transparent [&_[data-li]]:border-t [&_[data-li]]:border-separator",
);
const listContentVariants = cva({
  base: "flex flex-col overflow-hidden rounded [&_[data-li-inner]]:px-6 [&_[data-li-inner]]:py-4 [&_[data-li-inner]]:transition-colors [&_[data-li]]:transition-colors",
  variants: {
    variant: {
      plain: "[&_[data-li-inner]:hover]:bg-bg-idle [&_[data-li-inner]]:rounded",
      inset: "[&_[data-li-inner]:hover]:bg-bg-hover [&_[data-li-inner]]:bg-bg-darker",
    },
    withSeparator: {
      true: withSeparatorClasses,
      false: "",
    },
  },
  compoundVariants: [
    {
      variant: "inset",
      withSeparator: false,
      // force withSeparator to be true if variant is inset
      className: withSeparatorClasses,
    },
  ],
  defaultVariants: {
    variant: "inset",
    withSeparator: true,
  },
});

export const ListContent = forwardRef<
  HTMLDivElement,
  BaseProps<"div"> & { variants?: VariantProps<typeof listContentVariants> }
>(function ListContent({ asChild, variants, className, ...props }, ref) {
  const Component = asChild ? Slot : "div";
  return (
    <Component
      {...props}
      className={cn(listContentVariants({ ...variants, className }))}
      ref={ref}
    />
  );
});

export const ListItem = forwardRef<HTMLDivElement, BaseProps<"div">>(function ListItem(
  { asChild, className, style, onMouseMove, ...props },
  ref,
) {
  const Component = asChild ? Slot : "div";
  return (
    <div data-li>
      <Component
        {...props}
        className={cn("hover-bg flex w-full flex-row", className)}
        {...useHoverBackground({ style, onMouseMove })}
        data-li-inner
        ref={ref}
      />
    </div>
  );
});
