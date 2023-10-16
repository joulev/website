import {
  ChevronDown,
  Cloud,
  CreditCard,
  Github,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  User,
  UserPlus,
} from "lucide-react";
import type { Metadata } from "next";

import { Title } from "~/components/title";
import { Button, LinkButton } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Link } from "~/components/ui/link";
import { List, ListContent, ListHeader, ListItem } from "~/components/ui/lists";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuMainLink,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/lib/cn";

import {
  ControlledInputShowcase,
  DropdownCheckboxesShowcase,
  DropdownRadioGroupShowcase,
} from "./client-components";

function capitalise(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function Showcase({
  title,
  className,
  children,
}: React.PropsWithChildren<{ title: string; className?: string }>) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-xl font-bold">{title}</h2>
      <Card className={cn("flex flex-col gap-6", className)}>{children}</Card>
    </section>
  );
}

function ButtonShowcase() {
  const buttonVariants = ["primary", "secondary", "ghost"] as const;
  const buttonSizes = ["sm", "md", "lg"] as const;
  return (
    <Showcase title="Buttons">
      <div className="flex flex-col gap-6">
        {buttonSizes.map(size => (
          <div key={size} className="flex flex-row flex-wrap gap-3">
            {buttonVariants.map(variant => (
              <Button key={variant} variants={{ variant, size }}>
                {capitalise(variant)}
              </Button>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-row flex-wrap gap-3">
        <Button disabled>Disabled</Button>
        <Button variants={{ size: "icon-md" }}>
          <User />
        </Button>
        <Button>
          <User /> User
        </Button>
        <LinkButton href="https://example.com">Link</LinkButton>
      </div>
    </Showcase>
  );
}

function LinkShowcase() {
  return (
    <Showcase title="Links">
      <p>
        The <strong>Big Bang</strong> event is a{" "}
        <Link href="https://en.wikipedia.org/wiki/Physical_theory">physical theory</Link> that
        describes how the{" "}
        <Link href="https://en.wikipedia.org/wiki/Expansion_of_the_universe">
          universe expanded
        </Link>{" "}
        from an initial state of high{" "}
        <Link href="https://en.wikipedia.org/wiki/Energy_density">density</Link> and{" "}
        <Link href="https://en.wikipedia.org/wiki/Temperature">temperature</Link>.
      </p>
      <p>
        <Link href="https://en.wikipedia.org/wiki/Big_Bang">
          Click this link to read the full article on the Big Bang, while I make this link
          ridiculously long to show how the component works with line breaks inside the link.
        </Link>
      </p>
    </Showcase>
  );
}

function CardShowcase() {
  return (
    <Showcase title="Cards">
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non doloribus iure porro, sunt
        dolore eius, delectus reprehenderit maiores iste temporibus, praesentium repudiandae quod.
        Sapiente nesciunt, exercitationem, libero ipsa nam molestias nostrum quidem labore earum
        deleniti, impedit nemo consequatur unde ut facilis?
      </div>
      <div className="flex flex-row justify-end gap-3">
        <Button>Cancel</Button>
        <Button variants={{ variant: "primary" }}>Submit</Button>
      </div>
    </Showcase>
  );
}

function ListShowcase() {
  return (
    <Showcase title="List" className="grid grid-cols-1 gap-9 sm:grid-cols-2">
      <List>
        <ListHeader>Title</ListHeader>
        <ListContent>
          {Array.from({ length: 5 }).map((_, i) => (
            <ListItem key={i}>Item {i + 1}</ListItem>
          ))}
        </ListContent>
      </List>
      <List>
        <ListHeader>Title</ListHeader>
        <ListContent variants={{ variant: "plain" }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <ListItem key={i}>Item {i + 1}</ListItem>
          ))}
        </ListContent>
      </List>
    </Showcase>
  );
}

function InputShowcase() {
  return (
    <Showcase title="Input" className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <ControlledInputShowcase />
    </Showcase>
  );
}

function DropdownShowcase() {
  return (
    <Showcase title="Dropdown" className="grid grid-cols-1 sm:grid-cols-3">
      <div className="grid place-items-center py-9">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              Normal
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                <span>Billing</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Cloud />
                <span>API</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <UserPlus />
                  <span>Invite users</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <Mail />
                      <span>Email</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare />
                      <span>Message</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <PlusCircle />
                      <span>More...</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                <Plus />
                <span>New Team</span>
                <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid place-items-center py-9">
        <DropdownCheckboxesShowcase />
      </div>
      <div className="grid place-items-center py-9">
        <DropdownRadioGroupShowcase />
      </div>
    </Showcase>
  );
}

function SelectShowcase() {
  return (
    <Showcase title="Select" className="flex flex-row justify-center py-12">
      <Select>
        <SelectTrigger className="w-[240px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Vegetables</SelectLabel>
            <SelectItem value="broccoli">Broccoli</SelectItem>
            <SelectItem value="carrot" disabled>
              Carrot
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </Showcase>
  );
}

function NavigationMenuListItem({ title, children }: React.PropsWithChildren<{ title: string }>) {
  return (
    <li>
      <NavigationMenuLink
        href="#"
        className="flex select-none flex-col justify-between gap-3 leading-none no-underline outline-none"
      >
        <div className="text-sm font-semibold leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-text-secondary">{children}</p>
      </NavigationMenuLink>
    </li>
  );
}
function NavigationMenuShowcase() {
  const components: { title: string; description: string }[] = [
    {
      title: "Alert Dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Hover Card",
      description: "For sighted users to preview content available behind a link.",
    },
    {
      title: "Progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Scroll-area",
      description: "Visually or semantically separates content.",
    },
    {
      title: "Tabs",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
      title: "Tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
  ];

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-xl font-bold">Navigation Menu</h2>
      <div className="flex flex-col items-center">
        <div>
          <NavigationMenu className="z-0">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:w-[500px]">
                    <li>
                      <NavigationMenuLink href="#" asChild unstyled>
                        <div className="flex h-full w-full select-none flex-col justify-end bg-bg-darker p-6 no-underline outline-none">
                          <div className="mb-2 mt-4 text-lg font-medium">glui</div>
                          <p className="text-sm leading-tight text-text-secondary">
                            Glassmorphic component collection based on visionOS UI design system
                          </p>
                        </div>
                      </NavigationMenuLink>
                    </li>
                    <div className="flex flex-col gap-3 p-3">
                      <NavigationMenuListItem title="Introduction">
                        Re-usable components built using Radix UI and Tailwind CSS.
                      </NavigationMenuListItem>
                      <NavigationMenuListItem title="Installation">
                        How to install dependencies and structure your app.
                      </NavigationMenuListItem>
                      <NavigationMenuListItem title="Typography">
                        Styles for headings, paragraphs, lists...etc
                      </NavigationMenuListItem>
                    </div>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-3 md:grid-cols-2 lg:w-[600px]">
                    {components.map(component => (
                      <NavigationMenuListItem key={component.title} title={component.title}>
                        {component.description}
                      </NavigationMenuListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem className="max-sm:hidden">
                <NavigationMenuMainLink href="#">Documentation</NavigationMenuMainLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="grid h-[582px] place-items-center text-text-tertiary md:h-[320px]">
          Interact with the navigation menu above.
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <main className="container flex max-w-screen-md flex-col gap-9">
      <section className="flex flex-col gap-6">
        <Title
          title="glui"
          titleLabel={
            <span className="cursor-default select-none self-center rounded-full bg-bg-idle px-3 py-1 text-sm text-text-secondary backdrop-blur">
              work in progress
            </span>
          }
          subtitle={
            <div className="text-lg text-text-secondary">
              A component collection based on{" "}
              <Link href="https://www.figma.com/community/file/1253443272911187215/apple-design-resources-visionos">
                visionOS UI design system
              </Link>{" "}
              and built using <Link href="https://radix-ui.com/">Radix UI</Link>,{" "}
              <Link href="https://tailwindcss.com/">Tailwind CSS</Link> and{" "}
              <Link href="https://ui.shadcn.com/">shadcn/ui</Link>.
            </div>
          }
        />
        <LinkButton
          href="https://github.com/joulev/website/tree/main/src/components/ui"
          variants={{ variant: "primary" }}
        >
          <Github />
          See the components on GitHub
        </LinkButton>
      </section>
      <hr />
      <ButtonShowcase />
      <hr />
      <LinkShowcase />
      <hr />
      <CardShowcase />
      <hr />
      <ListShowcase />
      <hr />
      <InputShowcase />
      <hr />
      <DropdownShowcase />
      <hr />
      <SelectShowcase />
      <hr />
      <NavigationMenuShowcase />
    </main>
  );
}

export const metadata: Metadata = {
  title: "joulev.dev » glui",
  description: "A glassmorphic component collection",
  openGraph: {
    title: "joulev.dev » glui",
    description: "A glassmorphic component collection",
    url: "/glui",
  },
};
