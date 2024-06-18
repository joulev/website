"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <NextThemeProvider
      attribute="class"
      forcedTheme={pathname === "/blogs/walking-on-singapore-mrt-lines" ? "dark" : undefined}
    >
      {children}
    </NextThemeProvider>
  );
}
