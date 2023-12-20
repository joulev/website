"use client";

import { SessionProvider, useSession } from "next-auth/react";

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

const navItems: { title: string; href: string; description: string }[] = [
  {
    title: "anime",
    href: "/apps/anime",
    description: "My anime list using the AniList API. A different frontend of AniList for me",
  },
  {
    title: "cuid2",
    href: "/apps/cuid2",
    description: "Online cuid2 generator",
  },
  {
    title: "glui",
    href: "/glui",
    description: "A glassmorphic component system, based on visionOS UI design",
  },
  {
    title: "irasuto",
    href: "/apps/irasuto",
    description: "A website featuring Japanese illustrations that I love",
  },
  {
    title: "link",
    href: "/apps/link",
    description: "A simple URL shortener",
  },
  {
    title: "snippets",
    href: "/apps/snippets",
    description: "Upload and share short code snippets",
  },
  {
    title: "tategaki",
    href: "/apps/tategaki",
    description: "A website featuring text displayed in Japanese vertical writing style",
  },
];

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
  const session = useSession();
  return (
    <div className="fixed left-1/2 top-12 -translate-x-1/2">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="grid size-10 place-items-center rounded-full">
            <Link href="/" className="group/logo-link" unstyled>
              <Logo
                logoWidth={18}
                className="fill-text-secondary transition group-hover/logo-link:fill-text-primary"
              />
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Apps</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[500px] max-w-[calc(100vw-48px)] gap-3 p-3 md:grid-cols-2 lg:w-[600px]">
                {navItems.map(item => (
                  <NavigationMenuListItem key={item.title} href={item.href} title={item.title}>
                    {item.description}
                  </NavigationMenuListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuMainLink asChild>
              <Link href="/blogs" unstyled>
                Blog
              </Link>
            </NavigationMenuMainLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            {session.status === "authenticated" ? (
              <NavigationMenuMainLink href="/admin/chat">Admin</NavigationMenuMainLink>
            ) : (
              <NavigationMenuMainLink
                href="https://github.com/sponsors/joulev"
                target="_blank"
                rel="noreferrer noopener"
              >
                Sponsor
              </NavigationMenuMainLink>
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="pb-12 pt-[152px]">{children}</div>
      <Navigation />
    </SessionProvider>
  );
}
