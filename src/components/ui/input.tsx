"use client";

import { X } from "lucide-react";
import { forwardRef, useCallback, useRef } from "react";

import { cn } from "~/lib/cn";

import { Button } from "./button";
import { useHoverBackground } from "./hooks/use-hover-background";

export const Input = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(function Input(
  { className, type, disabled, placeholder, ...props },
  ref,
) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const setRef = useCallback(
    (el: HTMLInputElement | null) => {
      inputRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    },
    [ref],
  );
  const clearInput = useCallback(() => {
    if (inputRef.current) inputRef.current.value = "";
  }, []);
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full bg-bg-darker backdrop-blur",
        disabled ? "opacity-50" : "hover-bg recessed",
      )}
      {...useHoverBackground({})}
    >
      <input
        type={type}
        className={cn(
          "caret-blue placeholder:text-secondary peer w-full bg-transparent pr-[42px] placeholder:font-medium",
          type === "file" ? "py-[6px] pl-[7px]" : "py-[9px] pl-4",
          "file:rounded-full file:border-none file:bg-bg-idle file:px-3 file:py-1 file:text-sm file:text-text-primary file:transition-colors file:active:bg-bg-active",
          // https://stackoverflow.com/a/27935448
          "[&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none",
          "[&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none",
          "[appearance:textfield]",
          className,
        )}
        disabled={disabled}
        {...props}
        placeholder={placeholder?.length && placeholder.length > 0 ? placeholder : " "}
        ref={setRef}
      />
      <div className="absolute right-[7px] top-1/2 -translate-y-1/2 opacity-100 transition-opacity peer-placeholder-shown:pointer-events-none peer-placeholder-shown:opacity-0 peer-disabled:pointer-events-none peer-disabled:opacity-0">
        <Button variants={{ size: "icon-sm" }} onClick={clearInput}>
          <X />
        </Button>
      </div>
    </div>
  );
});
