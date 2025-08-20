"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import { Check, ChevronRight, Circle } from "~/components/icons";
import { cn } from "~/lib/cn";

import { Card } from "./card";
import { useHoverBackground } from "./hooks/use-hover-background";

export const DropdownMenu = DropdownMenuPrimitive.Root;

export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export const DropdownMenuGroup = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Group>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Group
    ref={ref}
    className={cn("flex flex-col gap-1", className)}
    {...props}
  />
));
DropdownMenuGroup.displayName = DropdownMenuPrimitive.Group.displayName;

export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

export const DropdownMenuSub = DropdownMenuPrimitive.Sub;

export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export const DropdownMenuSubTrigger = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger>
>(({ className, children, style, onMouseMove, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "hover-bg relative flex cursor-default select-none flex-row items-center gap-2 rounded-full px-3 py-2 text-sm outline-none transition-colors hover:bg-bg-hover active:bg-bg-active [&_svg]:size-4",
      className,
    )}
    {...props}
    {...useHoverBackground({ style, onMouseMove })}
  >
    {children}
    <ChevronRight className="ml-auto size-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

export const DropdownMenuSubContent = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, sideOffset = 0, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent ref={ref} sideOffset={sideOffset} asChild>
    <Card
      className={cn(
        "z-50 flex min-w-32 flex-col gap-1 overflow-hidden rounded-full border p-3 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.SubContent>
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

export const DropdownMenuContent = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 16, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content ref={ref} sideOffset={sideOffset} asChild>
      <Card
        className={cn(
          "z-50 flex min-w-32 flex-col gap-1 overflow-hidden rounded-full border p-3 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Content>
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

export const DropdownMenuItem = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ className, style, onMouseMove, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "hover-bg relative flex cursor-default select-none flex-row items-center gap-2 rounded-full px-3 py-2 text-sm outline-none transition-colors hover:bg-bg-hover active:bg-bg-active data-disabled:pointer-events-none data-disabled:text-text-tertiary [&_svg]:size-4",
      className,
    )}
    {...props}
    {...useHoverBackground({ style, onMouseMove })}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

export const DropdownMenuCheckboxItem = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, style, onMouseMove, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "hover-bg group/dropdown-checkbox relative flex cursor-default select-none flex-row items-center gap-2 rounded-full px-3 py-2 text-sm outline-none transition-colors hover:bg-bg-hover active:bg-bg-active data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:size-4",
      className,
    )}
    checked={checked}
    {...props}
    {...useHoverBackground({ style, onMouseMove })}
  >
    <DropdownMenuPrimitive.ItemIndicator>
      <Check />
    </DropdownMenuPrimitive.ItemIndicator>
    <div className="size-4 group-data-[state=checked]/dropdown-checkbox:hidden" />
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

export const DropdownMenuRadioItem = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, style, onMouseMove, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "hover-bg group/dropdown-checkbox relative flex cursor-default select-none flex-row items-center gap-2 rounded-full px-3 py-2 text-sm outline-none transition-colors hover:bg-bg-hover active:bg-bg-active data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:size-4",
      className,
    )}
    {...props}
    {...useHoverBackground({ style, onMouseMove })}
  >
    <DropdownMenuPrimitive.ItemIndicator>
      <Circle className="size-2! fill-current" />
    </DropdownMenuPrimitive.ItemIndicator>
    <div className="size-2 group-data-[state=checked]/dropdown-checkbox:hidden" />
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

export const DropdownMenuLabel = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "mx-3 my-1.5 flex cursor-default select-none flex-row justify-center text-xs font-medium text-text-secondary",
      className,
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

export const DropdownMenuSeparator = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("my-1 h-px bg-separator", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

export const DropdownMenuShortcut = forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(function DropdownMenuShortcut({ className, ...props }, ref) {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest text-text-secondary", className)}
      {...props}
      ref={ref}
    />
  );
});
