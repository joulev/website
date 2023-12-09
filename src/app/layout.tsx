import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { AxiomWebVitals } from "next-axiom";
import { Quattrocento_Sans as QuattrocentoSans } from "next/font/google";
import localFont from "next/font/local";

import { GitHub } from "~/components/icons";
import { Link } from "~/components/ui/link";
import { cn } from "~/lib/cn";

import { Background } from "./background";
import "./globals.css";

const sans = QuattrocentoSans({ subsets: ["latin"], weight: ["400", "700"], variable: "--sans" });
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
});

function VersionFooter() {
  const sha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
  const url = sha
    ? `https://github.com/joulev/website/commit/${sha}`
    : "https://github.com/joulev/website";
  const label = sha ? sha.slice(0, 7) : "unknown";
  return (
    <footer className="px-6 pb-12 text-center text-xs text-text-tertiary">
      <Link unstyled href={url} className="transition hover:text-text-secondary">
        <GitHub className="inline h-3 w-3" /> joulev/website@
        <span className="font-mono">{label}</span>
      </Link>
    </footer>
  );
}

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
