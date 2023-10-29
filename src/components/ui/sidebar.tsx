"use client";

import { Slot } from "@radix-ui/react-slot";
import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";

import { cn } from "~/lib/cn";
import type { BaseProps } from "~/types/utils";

import { Button } from "./button";
import { useHoverBackground } from "./hooks/use-hover-background";

export const Sidebar = forwardRef<HTMLDivElement, BaseProps<"div">>(function Sidebar(
  { asChild, className, ...props },
  ref,
) {
  const Component = asChild ? Slot : "div";
  return <Component {...props} className={cn("flex flex-col bg-bg-darker", className)} ref={ref} />;
});

export const SidebarHeader = forwardRef<HTMLDivElement, BaseProps<"div">>(function SidebarHeader(
  { asChild, className, ...props },
  ref,
) {
  const Component = asChild ? Slot : "div";
  return (
    <Component
      {...props}
      className={cn("flex flex-row items-center justify-between gap-3 p-6", className)}
      ref={ref}
    />
  );
});

export const SidebarHeaderTitle = forwardRef<HTMLDivElement, BaseProps<"h1">>(
  function SidebarHeaderTitle({ asChild, className, ...props }, ref) {
    const Component = asChild ? Slot : "h1";
    return (
      <Component
        {...props}
        className={cn("flex-grow truncate text-xl font-semibold", className)}
        ref={ref}
      />
    );
  },
);

export const SidebarSection = forwardRef<HTMLDivElement, BaseProps<"div">>(function SidebarSection(
  { asChild, className, ...props },
  ref,
) {
  const Component = asChild ? Slot : "div";
  return <Component {...props} className={cn("flex flex-col p-3", className)} ref={ref} />;
});

export const SidebarSectionHeading = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"h2"> & { hideCollapseButton?: boolean }
>(function SidebarSectionHeading({ className, children, hideCollapseButton, ...props }, ref) {
  return (
    <h2
      {...props}
      className={cn(
        "flex flex-row items-center justify-between gap-3 py-2 pl-3 pr-1 text-lg font-semibold",
        className,
      )}
      ref={ref}
    >
      <span className="h-[30px] flex-grow truncate">{children}</span>
      {hideCollapseButton || (
        <Button variants={{ variant: "ghost", size: "icon-sm" }}>
          <ChevronDown />
        </Button>
      )}
    </h2>
  );
});

export const SidebarSectionItems = forwardRef<HTMLDivElement, BaseProps<"div">>(
  function SidebarSectionItems({ asChild, className, ...props }, ref) {
    const Component = asChild ? Slot : "div";
    return <Component {...props} className={cn("flex flex-col gap-1", className)} ref={ref} />;
  },
);

export const SidebarSectionItem = forwardRef<
  HTMLDivElement,
  BaseProps<"div"> & { active?: boolean }
>(function SidebarSectionItem({ asChild, className, style, onMouseMove, active, ...props }, ref) {
  const Component = asChild ? Slot : "div";
  return (
    <Component
      {...props}
      className={cn(
        "flex flex-row items-center gap-3 px-3 py-2 [&_svg]:h-6 [&_svg]:w-6 [&_svg]:shrink-0 [&_svg]:text-text-secondary",
        "hover-bg relative rounded transition hover:bg-bg-idle active:bg-bg-active",
        active && "bg-bg-idle",
        className,
      )}
      {...useHoverBackground({ style, onMouseMove })}
      ref={ref}
    />
  );
});

export const SidebarSectionItemName = forwardRef<HTMLDivElement, BaseProps<"div">>(
  function SidebarSectionItemName({ asChild, className, ...props }, ref) {
    const Component = asChild ? Slot : "div";
    return <Component {...props} className={cn("flex-grow truncate", className)} ref={ref} />;
  },
);

export const SidebarSectionItemCounter = forwardRef<HTMLDivElement, BaseProps<"div">>(
  function SidebarSectionItemCounter({ asChild, className, ...props }, ref) {
    const Component = asChild ? Slot : "div";
    return (
      <Component
        {...props}
        className={cn("cursor-default select-none text-xs text-text-secondary", className)}
        ref={ref}
      />
    );
  },
);
