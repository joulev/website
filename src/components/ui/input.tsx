"use client";

import { X } from "lucide-react";
import { forwardRef, useCallback, useState } from "react";

import { cn } from "~/lib/cn";

import { Button } from "./button";
import { useHoverBackground } from "./hooks/use-hover-background";

export const Input = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(function Input(
  {
    className,
    type,
    disabled,
    value: valueFromProps,
    onChange: onChangeFromProps,
    defaultValue,
    ...props
  },
  ref,
) {
  const isControlled = typeof valueFromProps !== "undefined";
  const hasDefaultValue = typeof defaultValue !== "undefined";
  const [internalValue, setInternalValue] = useState(hasDefaultValue ? defaultValue : "");
  const value = isControlled ? valueFromProps : internalValue;
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChangeFromProps) onChangeFromProps(e);
      if (!isControlled) setInternalValue(e.target.value);
    },
    [isControlled, onChangeFromProps],
  );
  const onClear = useCallback(() => {
    if (onChangeFromProps)
      // welp
      onChangeFromProps({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
    if (!isControlled) setInternalValue("");
  }, [isControlled, onChangeFromProps]);

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
          "peer w-full bg-transparent pr-[42px] caret-blue placeholder:font-medium placeholder:text-text-secondary",
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
        value={value}
        onChange={onChange}
        ref={ref}
      />
      <div className="absolute right-[7px] top-1/2 -translate-y-1/2 opacity-100 transition-opacity peer-placeholder-shown:pointer-events-none peer-placeholder-shown:opacity-0 peer-disabled:pointer-events-none peer-disabled:opacity-0">
        <Button variants={{ size: "icon-sm" }} onClick={() => onClear()}>
          <X />
        </Button>
      </div>
    </div>
  );
});
