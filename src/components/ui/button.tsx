"use client";

import { type VariantProps, cva } from "cva";
import Link from "next/link";
import { forwardRef } from "react";

import { cn } from "~/lib/cn";

import { useHoverBackground } from "./hooks/use-hover-background";

const buttonVariants = cva({
  base: "hover-bg inline-flex flex-row items-center justify-center gap-[--button-gap] rounded-full outline-offset-4 backdrop-blur transition disabled:cursor-not-allowed disabled:bg-bg-disabled disabled:text-text-tertiary",
  variants: {
    variant: {
      primary: "bg-text-primary text-black shadow disabled:shadow-none",
      secondary: "bg-bg-idle text-text-primary",
      ghost: "bg-transparent text-text-primary hover:bg-bg-hover",
    },
    size: {
      sm: "w-fit px-3 py-1 text-sm [--button-gap:0.25rem] [&_svg]:h-4 [&_svg]:w-4",
      md: "w-fit px-4 py-2 text-base [--button-gap:0.5rem] [&_svg]:h-6 [&_svg]:w-6",
      lg: "w-fit px-5 py-2.5 text-lg [--button-gap:0.75rem] [&_svg]:h-7 [&_svg]:w-7",
      "icon-sm": "h-[30px] w-[30px] p-1 [--button-gap:0.25rem] [&_svg]:h-4 [&_svg]:w-4",
      "icon-md": "h-[42px] w-[42px] p-2 [--button-gap:0.5rem] [&_svg]:h-6 [&_svg]:w-6",
      "icon-lg": "h-[50px] w-[50px] p-2.5 [--button-gap:0.75rem] [&_svg]:h-7 [&_svg]:w-7",
    },
  },
  defaultVariants: {
    variant: "secondary",
    size: "md",
  },
});

export const Button = forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button"> & { variants?: VariantProps<typeof buttonVariants> }
>(function Button({ variants, className, style, onMouseMove, children, ...rest }, ref) {
  return (
    <button
      className={cn(buttonVariants({ ...variants, className }))}
      type="button"
      tabIndex={0}
      {...rest}
      {...useHoverBackground({ style, onMouseMove })}
      ref={ref}
    >
      {children}
    </button>
  );
});

export const LinkButton = forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof Link> & { variants?: VariantProps<typeof buttonVariants> }
>(function LinkButton({ variants, href, className, style, onMouseMove, children, ...rest }, ref) {
  return (
    <Link
      className={cn(buttonVariants({ ...variants, className }))}
      tabIndex={0}
      href={href}
      {...rest}
      {...useHoverBackground({ style, onMouseMove })}
      ref={ref}
    >
      {children}
    </Link>
  );
});
