import { Analytics } from "@vercel/analytics/react";
import { Github } from "lucide-react";
import type { Metadata } from "next";
import { AxiomWebVitals } from "next-axiom";
import { Hanken_Grotesk as HankenGrotesk, Inconsolata } from "next/font/google";

import { Link } from "~/components/ui/link";
import { cn } from "~/lib/cn";

import { Background } from "./background";
import "./globals.css";

const sans = HankenGrotesk({ subsets: ["latin"], variable: "--sans" });
const mono = Inconsolata({ subsets: ["latin"], variable: "--mono" });

function VersionFooter() {
  const sha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
  const url = sha
    ? `https://github.com/joulev/website/commit/${sha}`
    : "https://github.com/joulev/website";
  const label = sha ? sha.slice(0, 7) : "unknown";
  return (
    <footer className="px-6 pb-12 text-center text-xs text-text-tertiary">
      <Link unstyled href={url} className="transition hover:text-text-secondary">
        <Github className="inline h-3 w-3" /> joulev/website@
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
        <Background position={Math.random()} />
        {children}
        <VersionFooter />
        <Analytics />
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
