import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { AxiomWebVitals } from "next-axiom";
import { Hanken_Grotesk as HankenGrotesk } from "next/font/google";
import localFont from "next/font/local";

import { cn } from "~/lib/cn";

import { Background } from "./background";
import "./globals.css";
import { VersionFooter } from "./version-footer";

const sans = HankenGrotesk({ subsets: ["latin"], variable: "--sans" });
const mono = localFont({
  src: [
    { path: "../../.fonts/ia-writer-mono/regular.woff2", weight: "normal", style: "normal" },
    { path: "../../.fonts/ia-writer-mono/bold.woff2", weight: "bold", style: "normal" },
    { path: "../../.fonts/ia-writer-mono/italic.woff2", weight: "normal", style: "italic" },
    { path: "../../.fonts/ia-writer-mono/bolditalic.woff2", weight: "bold", style: "italic" },
  ],
  display: "swap",
  declarations: [{ prop: "size-adjust", value: "90%" }],
  variable: "--mono",
  adjustFontFallback: false,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(sans.variable, mono.variable, "bg-[#334155] font-sans text-text-primary")}
      >
        <Background />
        {children}
        <VersionFooter />
        <Analytics />
        <SpeedInsights />
        <AxiomWebVitals />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL("https://joulev.dev"),
  robots: { index: true, follow: true },
  twitter: { card: "summary_large_image", creator: "@joulev_3" },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon", sizes: "any" },
    ],
  },
};
