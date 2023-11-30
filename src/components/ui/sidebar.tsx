"use client";

import { Slot } from "@radix-ui/react-slot";
import { ChevronDown } from "lucide-react";
import { forwardRef, useCallback, useState } from "react";

import { cn } from "~/lib/cn";
import { generateContext } from "~/lib/hooks/generate-context";
import type { BaseProps } from "~/types/utils";

import { buttonVariants } from "./button";
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

const [SectionContext, useSectionContext] = generateContext<{
  isOpen: boolean;
  toggle: () => void;
}>();

export const SidebarSection = forwardRef<
  HTMLDivElement,
  BaseProps<"div"> & { isCollapsedInitially?: boolean }
>(function SidebarSection({ asChild, className, isCollapsedInitially, ...props }, ref) {
  const [isOpen, setIsOpen] = useState(!isCollapsedInitially);
  const toggle = useCallback(() => setIsOpen(x => !x), []);
  const Component = asChild ? Slot : "div";
  return (
    <SectionContext value={{ isOpen, toggle }}>
      <Component {...props} className={cn("flex flex-col p-3", className)} ref={ref} />
    </SectionContext>
  );
});

function SidebarSectionHeadingCollapseButton() {
  const { isOpen } = useSectionContext();
  return (
    <span
      className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
      {...useHoverBackground({})}
    >
      <ChevronDown className={cn(isOpen || "-rotate-90", "transition-transform")} />
    </span>
  );
}

export const SidebarSectionHeading = forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button"> & { hideCollapseButton?: boolean }
>(function SidebarSectionHeading({ className, children, hideCollapseButton, ...props }, ref) {
  const { toggle } = useSectionContext();
  return (
    <button
      {...props}
      type="button"
      className={cn(
        "flex flex-row items-center justify-between gap-3 py-2 pl-3 pr-1 text-lg font-semibold",
        className,
      )}
      onClick={toggle}
      ref={ref}
    >
      <span className="h-[30px] flex-grow truncate text-left">{children}</span>
      {hideCollapseButton || <SidebarSectionHeadingCollapseButton />}
    </button>
  );
});

export const SidebarSectionItems = forwardRef<HTMLDivElement, BaseProps<"div">>(
  function SidebarSectionItems({ asChild, className, ...props }, ref) {
    const { isOpen } = useSectionContext();
    const Component = asChild ? Slot : "div";
    return (
      <div
        className="grid transition-all ease-in-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <Component {...props} className={cn("flex flex-col gap-1", className)} ref={ref} />
        </div>
      </div>
    );
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
