import { defineConfig } from "cva";
import { twMerge } from "tailwind-merge";

export const { cva, cx: cn } = defineConfig({
  hooks: { onComplete: className => twMerge(className) },
});
