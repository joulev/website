import { slug } from "github-slugger";
import { h3 as H3 } from "~/components/blogs";
import {
  Atom,
  ChevronDown,
  Cloud,
  Coffee,
  CreditCard,
  FlaskConical,
  Gamepad2,
  List as ListIcon,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Sigma,
  Swords,
  User,
  UserPlus,
} from "~/components/icons";
import { Button, LinkButton } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
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
import { Progress } from "~/components/ui/progress";
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
import {
  Sidebar,
  SidebarHeader,
  SidebarHeaderTitle,
  SidebarSection,
  SidebarSectionHeading,
  SidebarSectionItem,
  SidebarSectionItemCounter,
  SidebarSectionItemName,
  SidebarSectionItems,
} from "~/components/ui/sidebar";
import { Slider } from "~/components/ui/slider";
import { Tweet } from "~/components/ui/tweet";
import { cn } from "~/lib/cn";

import {
  ControlledInputShowcase,
  ControlledTextAreaShowcase,
  DropdownCheckboxesShowcase,
  DropdownRadioGroupShowcase,
} from "./client-components";

function capitalise(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function Showcase({
  title,
  className,
  noCard,
  children,
}: React.PropsWithChildren<{ title: string; className?: string; noCard?: boolean }>) {
  const id = slug(title);
  return (
    <section>
      <H3 id={id}>{title}</H3>
      {noCard ? (
        children
      ) : (
        <Card className={cn("flex flex-col gap-6 not-prose backdrop-blur-none", className)}>
          {children}
        </Card>
      )}
    </section>
  );
}

export function ButtonShowcase() {
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

export function LinkShowcase() {
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
          ridiculously long to show how the component works with line breaks.
        </Link>
      </p>
    </Showcase>
  );
}

export function CardShowcase() {
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

export function ListShowcase() {
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

export function InputShowcase() {
  return (
    <Showcase title="Input" className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <ControlledInputShowcase />
    </Showcase>
  );
}

export function DropdownShowcase() {
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

export function SelectShowcase() {
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
      <NavigationMenuLink className="flex select-none flex-col justify-between gap-3 leading-none no-underline outline-none">
        <div className="text-sm font-semibold leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-text-secondary">{children}</p>
      </NavigationMenuLink>
    </li>
  );
}
export function NavigationMenuShowcase() {
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
    <Showcase title="Navigation Menu" noCard>
      <div className="flex flex-col items-center not-prose">
        <div>
          {/* This class is only here because Safari 18.0 is stupid https://discussions.apple.com/thread/255764118?sortBy=rank */}
          <NavigationMenu className="[&_[data-navigation-menu-viewport]]:backdrop-blur-none">
            <NavigationMenuList className="backdrop-blur-none">
              <NavigationMenuItem>
                <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:w-[500px]">
                    <li>
                      <NavigationMenuLink
                        className="flex h-full w-full select-none flex-col justify-end bg-bg-darker p-6 no-underline outline-none"
                        unstyled
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">glui</div>
                        <p className="text-sm leading-tight text-text-secondary">
                          Glassmorphic component collection based on visionOS UI design system
                        </p>
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
                <NavigationMenuMainLink>Documentation</NavigationMenuMainLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="h-[582px] md:h-[320px]" />
      </div>
    </Showcase>
  );
}

export function TextAreaShowcase() {
  return (
    <Showcase title="TextArea">
      <ControlledTextAreaShowcase />
    </Showcase>
  );
}

export function SidebarShowcase() {
  return (
    <Showcase title="Sidebar" className="p-0">
      <Sidebar className="w-64">
        <SidebarHeader>
          <SidebarHeaderTitle>My notes</SidebarHeaderTitle>
          <Button>Edit</Button>
        </SidebarHeader>
        <SidebarSection>
          <SidebarSectionHeading hideCollapseButton>Study</SidebarSectionHeading>
          <SidebarSectionItems>
            <SidebarSectionItem>
              <Sigma />
              <SidebarSectionItemName>Mathematics</SidebarSectionItemName>
              <SidebarSectionItemCounter>3</SidebarSectionItemCounter>
            </SidebarSectionItem>
            <SidebarSectionItem>
              <Atom />
              <SidebarSectionItemName>Physics</SidebarSectionItemName>
              <SidebarSectionItemCounter>2</SidebarSectionItemCounter>
            </SidebarSectionItem>
            <SidebarSectionItem active>
              <FlaskConical />
              <SidebarSectionItemName>Chemistry</SidebarSectionItemName>
              <SidebarSectionItemCounter>1 new</SidebarSectionItemCounter>
            </SidebarSectionItem>
          </SidebarSectionItems>
        </SidebarSection>
        <SidebarSection isCollapsedInitially>
          <SidebarSectionHeading>Gaming notes</SidebarSectionHeading>
          <SidebarSectionItems>
            <SidebarSectionItem>
              <Gamepad2 />
              <SidebarSectionItemName>Game release dates</SidebarSectionItemName>
            </SidebarSectionItem>
            <SidebarSectionItem>
              <Swords />
              <SidebarSectionItemName>Honkai: Star Rail build guide</SidebarSectionItemName>
              <SidebarSectionItemCounter>5</SidebarSectionItemCounter>
            </SidebarSectionItem>
          </SidebarSectionItems>
        </SidebarSection>
        <SidebarSection>
          <SidebarSectionHeading>Miscellaneous</SidebarSectionHeading>
          <SidebarSectionItems>
            <SidebarSectionItem>
              <ListIcon />
              <SidebarSectionItemName>Shopping lists</SidebarSectionItemName>
            </SidebarSectionItem>
            <SidebarSectionItem>
              <Coffee />
              <SidebarSectionItemName>Good coffee shops</SidebarSectionItemName>
            </SidebarSectionItem>
          </SidebarSectionItems>
        </SidebarSection>
      </Sidebar>
    </Showcase>
  );
}

export function ProgressShowcase() {
  return (
    <Showcase title="Progress">
      <div className="mx-auto flex w-64 flex-col gap-6">
        {[0, 0.2, 0.4, 0.6, 0.8, 1].map(value => (
          <Progress value={value} key={value} />
        ))}
      </div>
    </Showcase>
  );
}

export function DialogShowcase() {
  return (
    <Showcase title="Dialog" className="flex flex-row justify-center py-12">
      <Dialog>
        <DialogTrigger asChild>
          <Button>About Lipsum</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Lipsum</DialogTitle>
            <DialogDescription>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.{" "}
              <Link href="https://lipsum.com">Source</Link>
            </DialogDescription>
          </DialogHeader>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ultricies nulla ut leo
            blandit congue. Duis eleifend, sapien eget tristique bibendum, elit massa tempus diam,
            eleifend porta nunc justo in ante. Integer vitae blandit neque.
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="w-full sm:w-auto">Cancel</Button>
            </DialogClose>
            <Button className="w-full sm:w-auto" variants={{ variant: "primary" }}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Showcase>
  );
}

export function SliderShowcase() {
  return (
    <Showcase title="Slider">
      <div className="mx-auto my-12 w-64">
        <Slider defaultValue={[33]} max={100} step={1} />
      </div>
    </Showcase>
  );
}

export function TweetShowcase() {
  return (
    <Showcase title="Tweet" noCard>
      <div className="not-prose">
        <Tweet id="1736177027433316701" />
      </div>
    </Showcase>
  );
}
