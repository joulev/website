import type { Metadata } from "next";
import { B612_Mono as B612Mono, Hanken_Grotesk as HankenGrotesk } from "next/font/google";
import tw from "tailwindcss/colors";

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

import "./globals.css";

const sans = HankenGrotesk({ subsets: ["latin"], variable: "--sans" });
const mono = B612Mono({ subsets: ["latin"], weight: "400", variable: "--mono" });

function Background() {
  const [W, H] = [2000, 1400];
  const colours = [
    // top - right - bottom - left
    { colour: tw.blue[800], opacity: 0.5 },
    { colour: tw.emerald[800], opacity: 0.5 },
    { colour: tw.yellow[900], opacity: 0.3 },
    { colour: tw.green[800], opacity: 0.5 },
  ] as const;
  function getBackgroundCSS({ colour, opacity }: (typeof colours)[number]) {
    const opacityHex = Math.round(opacity * 255).toString(16);
    return `radial-gradient(50% 50% at 50% 50%, ${colour}${opacityHex} 0%, ${colour}00 100%)`;
  }
  return (
    <div
      className="fixed left-1/2 top-1/2 -z-50 min-h-[100lvh] min-w-full origin-center -translate-x-1/2 -translate-y-1/2 overflow-hidden"
      style={{ aspectRatio: `${W} / ${H}` }}
    >
      <div
        className="absolute origin-center"
        style={{
          width: `${(2293 / W) * 100}%`,
          height: `${(1995 / H) * 100}%`,
          left: "12%",
          top: "-50%",
          transform: "rotate(-147.82deg)",
          background: getBackgroundCSS(colours[0]),
        }}
      />
      <div
        className="absolute origin-center"
        style={{
          width: `${(2748 / W) * 100}%`,
          height: `${(2259 / H) * 100}%`,
          left: "20%",
          top: 0,
          transform: "rotate(99.75deg)",
          background: getBackgroundCSS(colours[1]),
        }}
      />
      <div
        className="absolute origin-center"
        style={{
          width: `${(2293 / W) * 100}%`,
          height: `${(2205 / H) * 100}%`,
          left: "-20%",
          top: "0%",
          transform: "rotate(-170.86deg)",
          background: getBackgroundCSS(colours[2]),
        }}
      />
      <div
        className="absolute origin-center"
        style={{
          width: `${(2464 / W) * 100}%`,
          height: `${(2075 / H) * 100}%`,
          left: "-50%",
          top: "-50%",
          transform: "rotate(99.75deg)",
          background: getBackgroundCSS(colours[3]),
        }}
      />
      <div className="absolute inset-0 backdrop-blur" />
    </div>
  );
}

function NavigationMenuListItem({
  href,
  title,
  children,
}: React.PropsWithChildren<{ href: string; title: string }>) {
  return (
    <li>
      <NavigationMenuLink
        href={href}
        className="flex select-none flex-col justify-between gap-3 leading-none no-underline outline-none"
      >
        <div className="text-sm font-semibold leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-text-secondary">{children}</p>
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
      href: "https://tategaki.joulev.dev",
      description: "A website featuring text displayed in Japanese vertical writing style",
    },
    {
      title: "anime",
      href: "https://anime.joulev.dev",
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
            <NavigationMenuMainLink href="/">Home</NavigationMenuMainLink>
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
            <NavigationMenuMainLink href="/sponsor" target="_blank" rel="noreferrer noopener">
              Sponsor
            </NavigationMenuMainLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(sans.variable, mono.variable, "bg-[#334155] font-sans text-text-primary")}
      >
        <Background />
        <div className="pb-24 pt-[152px]">{children}</div>
        <Navigation />
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
