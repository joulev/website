"use client";

import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";

import { cn } from "~/lib/cn";

import { useHoverBackground } from "./hooks/use-hover-background";

export const NavigationMenu = forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
    {...props}
  >
    {children}
    <div className={cn("absolute top-full flex justify-center md:left-1/2 md:-translate-x-1/2")}>
      <NavigationMenuPrimitive.Viewport
        className={cn(
          "card relative mt-4 h-[--radix-navigation-menu-viewport-height] w-full origin-[top_center] overflow-hidden rounded-full bg-bg-idle backdrop-blur transition-all",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90",
        )}
      />
    </div>
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

export const NavigationMenuList = forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "card-pill group flex flex-1 list-none items-center justify-center gap-2 rounded-full bg-bg-idle p-2 backdrop-blur",
      className,
    )}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

export const NavigationMenuItem = NavigationMenuPrimitive.Item;

export const NavigationMenuLink = forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Link>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link> & { unstyled?: boolean }
>(({ unstyled, className, style, onMouseMove, ...props }, ref) => (
  <NavigationMenuPrimitive.Link
    className={cn(
      unstyled ||
        "hover-bg relative m-1 block rounded p-2 transition-all hover:m-0 hover:bg-bg-idle hover:p-3 active:m-0 active:bg-bg-active active:p-3",
      className,
    )}
    {...useHoverBackground({ style, onMouseMove })}
    {...props}
    ref={ref}
  />
));
NavigationMenuLink.displayName = NavigationMenuPrimitive.Link.displayName;

export const NavigationMenuMainLink = forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Link>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>
>(function NavigationMenuMainLink({ className, style, onMouseMove, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Link
      ref={ref}
      className={cn(
        // Must be flex here, otherwise the height is off by 3px. Don't ask me why.
        "hover-bg relative flex flex-row items-center rounded-full px-4 py-2 text-text-secondary transition-colors hover:bg-bg-idle hover:text-text-primary focus:outline-none active:bg-bg-active active:text-text-primary disabled:pointer-events-none disabled:opacity-50",
        "before:rounded-full", // somehow I need this here. Don't ask me why
        className,
      )}
      {...useHoverBackground({ style, onMouseMove })}
      {...props}
    />
  );
});

export const NavigationMenuTrigger = forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, style, onMouseMove, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(
      "hover-bg group/menu-trigger relative inline-flex w-max items-center justify-center rounded-full bg-transparent px-4 py-2 text-text-secondary transition-colors hover:bg-bg-idle hover:text-text-primary focus:outline-none active:bg-bg-active active:text-text-primary disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-bg-idle data-[active]:text-text-primary data-[state=open]:text-text-primary",
      className,
    )}
    {...useHoverBackground({ style, onMouseMove })}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="relative ml-2 h-4 w-4 transition-transform group-data-[state=open]/menu-trigger:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

export const NavigationMenuContent = forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn("overflow-hidden rounded-full", className)}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;
