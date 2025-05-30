"use client";
import { RemoveScroll } from "react-remove-scroll";
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
import { signOutAction } from "./sign-out";

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

export function Navigation() {
  const components: { title: string; href: string; description: string }[] = [
    {
      title: "chat",
      href: "/admin/chat",
      description: "Chat with GPT-4 Turbo",
    },
    {
      title: "upload",
      href: "/admin/upload",
      description: "Upload files to the Internet",
    },
    {
      title: "anime",
      href: "/admin/manage/anime",
      description: "Manage my anime list",
    },
    {
      title: "irasuto",
      href: "/admin/manage/irasuto",
      description: "Manage the irasuto illustration collection",
    },
    {
      title: "link",
      href: "/admin/manage/link",
      description: "Manage personal short links",
    },
  ];
  return (
    <div className={cn("fixed top-12 inset-x-0 z-10", RemoveScroll.classNames.zeroRight)}>
      <NavigationMenu className="mx-auto">
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
            <NavigationMenuTrigger>Admin items</NavigationMenuTrigger>
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
            <NavigationMenuMainLink asChild>
              <form action={signOutAction}>
                <button type="submit">Sign out</button>
              </form>
            </NavigationMenuMainLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
