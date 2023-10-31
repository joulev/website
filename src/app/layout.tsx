import { Analytics } from "@vercel/analytics/react";
import { Github } from "lucide-react";
import type { Metadata } from "next";
import { AxiomWebVitals } from "next-axiom";
import { Hanken_Grotesk as HankenGrotesk, Inconsolata } from "next/font/google";

import { Logo } from "~/components/logo";
import { Link } from "~/components/ui/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuMainLink,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import { cn } from "~/lib/cn";

import { Background } from "./background";
import "./globals.css";

const sans = HankenGrotesk({ subsets: ["latin"], variable: "--sans" });
const mono = Inconsolata({ subsets: ["latin"], variable: "--mono" });

function NavigationMenuListItem({
  href,
  title,
  children,
}: React.PropsWithChildren<{ href: string; title: string }>) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="flex select-none flex-col justify-between gap-3 leading-none no-underline outline-none"
          unstyled
        >
          <div className="text-sm font-semibold leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-text-secondary">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
function Navigation() {
  const components: { title: string; href: string; description: string }[] = [
    {
      title: "glui",
      href: "/glui",
      description: "A glassmorphic component system, based on visionOS UI design",
    },
    {
      title: "cuid2",
      href: "/apps/cuid2",
      description: "Online cuid2 generator",
    },
    {
      title: "tategaki",
      href: "/apps/tategaki",
      description: "A website featuring text displayed in Japanese vertical writing style",
    },
    {
      title: "anime",
      href: "/apps/anime",
      description: "My anime list using the AniList API. A different frontend of AniList for me",
    },
    {
      title: "link",
      href: "/apps/link",
      description: "A simple URL shortener",
    },
    {
      title: "irasuto",
      href: "/apps/irasuto",
      description: "A website featuring Japanese illustrations that I love",
    },
  ];
  return (
    <div className="fixed left-1/2 top-12 -translate-x-1/2">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="grid h-10 w-10 place-items-center rounded-full">
            <Link href="/" className="group/logo-link" unstyled>
              <Logo
                logoWidth={18}
                className="fill-text-secondary transition group-hover/logo-link:fill-text-primary"
              />
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuMainLink asChild>
              <Link href="/" unstyled>
                Home
              </Link>
            </NavigationMenuMainLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Apps</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[500px] max-w-[calc(100vw-48px)] gap-3 p-3 md:grid-cols-2 lg:w-[600px]">
                {components.map(component => (
                  <NavigationMenuListItem
                    key={component.title}
                    href={component.href}
                    title={component.title}
                  >
                    {component.description}
                  </NavigationMenuListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuMainLink
              href="https://github.com/sponsors/joulev"
              target="_blank"
              rel="noreferrer noopener"
            >
              Sponsor
            </NavigationMenuMainLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

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
        <div className="pb-12 pt-[152px]">{children}</div>
        <VersionFooter />
        <Navigation />
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
