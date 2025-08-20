"use client";

import { Slot } from "@radix-ui/react-slot";
import type { VariantProps } from "cva";
import { forwardRef } from "react";

import { cn, cva } from "~/lib/cn";
import type { BaseProps } from "~/types/utils";

import { useHoverBackground } from "./hooks/use-hover-background";

export const List = forwardRef<HTMLDivElement, BaseProps<"div">>(function List(
  { asChild, className, ...props },
  ref,
) {
  const Component = asChild ? Slot : "section";
  return <Component {...props} className={cn("flex flex-col gap-2", className)} ref={ref} />;
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
  "[&_[data-li]:first-of-type]:border-none [&_[data-li]:hover]:border-transparent [&_[data-li]:hover+[data-li]]:border-transparent **:data-li:border-t **:data-li:border-separator",
);
const listContentVariants = cva({
  base: "flex flex-col overflow-hidden rounded [&_[data-li-inner]:hover:active]:bg-bg-active **:data-li-inner:px-6 **:data-li-inner:py-4 **:data-li-inner:transition-colors **:data-li:transition-colors",
  variants: {
    variant: {
      plain: "[&_[data-li-inner]:hover]:bg-bg-idle **:data-li-inner:rounded",
      inset: "[&_[data-li-inner]:hover]:bg-bg-hover **:data-li-inner:bg-bg-darker",
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
  HTMLUListElement,
  BaseProps<"ul"> & { variants?: VariantProps<typeof listContentVariants> }
>(function ListContent({ asChild, variants, className, ...props }, ref) {
  const Component = asChild ? Slot : "ul";
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
    <li data-li>
      <Component
        {...props}
        className={cn("hover-bg flex w-full flex-row", className)}
        {...useHoverBackground({ style, onMouseMove })}
        data-li-inner
        ref={ref}
      />
    </li>
  );
});

export const ListFooter = forwardRef<HTMLDivElement, BaseProps<"div">>(function ListFooter(
  { asChild, className, ...props },
  ref,
) {
  const Component = asChild ? Slot : "div";
  return (
    <Component {...props} className={cn("px-6 text-xs text-text-secondary", className)} ref={ref} />
  );
});
