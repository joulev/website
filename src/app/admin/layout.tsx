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
import { signOut } from "~/lib/auth/config";
import { getSession } from "~/lib/auth/helpers";

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
      title: "anime",
      href: "/admin/manage/anime",
      description: "Manage my anime list",
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
            <NavigationMenuTrigger>Manage</NavigationMenuTrigger>
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
              <Link href="/admin/chat" unstyled>
                Chat
              </Link>
            </NavigationMenuMainLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuMainLink asChild>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirect: true, redirectTo: "/" });
                }}
              >
                <button type="submit">Sign out</button>
              </form>
            </NavigationMenuMainLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  await getSession();
  return (
    <>
      <div className="pb-12 pt-[152px]">{children}</div>
      <Navigation />
    </>
  );
}

export const runtime = "edge";
