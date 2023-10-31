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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="pb-12 pt-[152px]">{children}</div>
      <Navigation />
    </>
  );
}
