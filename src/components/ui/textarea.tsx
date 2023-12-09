"use client";

import { forwardRef, useCallback } from "react";

import { X } from "~/components/icons";
import { cn } from "~/lib/cn";

import { Button } from "./button";
import { useHoverBackground } from "./hooks/use-hover-background";

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  // Force controlled component
  Omit<React.ComponentProps<"textarea">, "defaultValue" | "value" | "onChange"> & {
    value?: string;
    onValueChange?: (val: string) => void;
  }
>(function TextArea({ className, disabled, value, onValueChange, ...props }, ref) {
  const onClear = useCallback(() => {
    onValueChange?.("");
  }, [onValueChange]);
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded bg-bg-darker backdrop-blur",
        disabled ? "opacity-50" : "hover-bg recessed",
      )}
      {...useHoverBackground({})}
    >
      <textarea
        className={cn(
          "block", // https://stackoverflow.com/a/63431170
          "peer w-full bg-transparent py-[9px] pl-4 pr-[42px] caret-blue placeholder:font-medium placeholder:text-text-secondary",
          className,
        )}
        disabled={disabled}
        {...props}
        value={value}
        onChange={event => onValueChange?.(event.target.value)}
        ref={ref}
      />
      <div
        className={cn(
          "absolute right-[7px] top-[7px] transition-opacity peer-disabled:pointer-events-none peer-disabled:opacity-0",
          value === "" ? "pointer-events-none opacity-0" : "opacity-100",
        )}
      >
        <Button variants={{ size: "icon-sm" }} onClick={() => onClear()}>
          <X />
        </Button>
      </div>
    </div>
  );
});
