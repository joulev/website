"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { forwardRef } from "react";

import { Check, ChevronDown } from "~/components/icons";
import { cn } from "~/lib/cn";

import { Card } from "./card";
import { useHoverBackground } from "./hooks/use-hover-background";

export const Select = SelectPrimitive.Root;

export const SelectGroup = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Group>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Group ref={ref} className={cn("flex flex-col gap-1", className)} {...props} />
));
SelectGroup.displayName = SelectPrimitive.Group.displayName;

export const SelectValue = SelectPrimitive.Value;

export const SelectTrigger = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, style, onMouseMove, ...props }, ref) => (
  <SelectPrimitive.Trigger
    className={cn(
      "hover-bg recessed relative flex min-h-[42px] w-full items-center justify-between rounded-full px-4 py-[9px] placeholder:font-medium placeholder:text-text-secondary disabled:static disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none",
      className,
    )}
    {...useHoverBackground({ style, onMouseMove })}
    {...props}
    ref={ref}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 text-text-tertiary" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

export const SelectContent = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, sideOffset = 16, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content sideOffset={sideOffset} position={position} ref={ref} asChild>
      <Card
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-full border p-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        {...props}
      >
        <SelectPrimitive.Viewport
          className={cn(
            position === "popper" &&
              "flex h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] flex-col gap-1 p-3",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
      </Card>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

export const SelectLabel = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      "my-1.5 ml-9 mr-3 cursor-default select-none text-xs font-medium text-text-secondary",
      className,
    )}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

export const SelectItem = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, style, onMouseMove, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "hover-bg group/select-item relative flex w-full cursor-default select-none flex-row items-center gap-2 rounded-full px-3 py-2 text-sm outline-none transition-colors hover:bg-bg-hover active:bg-bg-active data-[disabled]:pointer-events-none data-[disabled]:text-text-tertiary [&_svg]:h-4 [&_svg]:w-4",
      className,
    )}
    {...props}
    {...useHoverBackground({ style, onMouseMove })}
  >
    <SelectPrimitive.ItemIndicator>
      <Check />
    </SelectPrimitive.ItemIndicator>
    <div className="h-4 w-4 group-data-[state=checked]/select-item:hidden" />
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

export const SelectSeparator = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-separator", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
