"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";

function shouldBeDark(pathname: string) {
  if (pathname === "/blogs/walking-on-singapore-mrt-lines") return true;
  if (pathname.startsWith("/p/")) return true;
  if (pathname.startsWith("/apps/snippets")) return true;
  return false;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <NextThemeProvider
      attribute="class"
      forcedTheme={shouldBeDark(pathname) ? "dark" : undefined}
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  );
}
