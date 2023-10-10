import { Github, Home, User } from "lucide-react";

import { Button, LinkButton } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Link } from "~/components/ui/link";
import { List, ListContent, ListHeader, ListItem } from "~/components/ui/lists";

function capitalise(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function Showcase({ title, children }: React.PropsWithChildren<{ title: string }>) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-xl font-bold">{title}</h2>
      {children}
    </section>
  );
}

function ButtonShowcase() {
  const buttonVariants = ["primary", "secondary", "ghost"] as const;
  const buttonSizes = ["sm", "md", "lg"] as const;
  return (
    <Showcase title="Buttons">
      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
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
      <Card>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non doloribus iure porro, sunt
        dolore eius, delectus reprehenderit maiores iste temporibus, praesentium repudiandae quod.
        Sapiente nesciunt, exercitationem, libero ipsa nam molestias nostrum quidem labore earum
        deleniti, impedit nemo consequatur unde ut facilis? Veritatis dignissimos veniam, amet
        corporis, repellendus iste nemo maxime laboriosam sed doloremque animi laudantium placeat
        quam soluta beatae rem assumenda libero architecto ullam aperiam facere odio vel. Assumenda
        nesciunt, ratione consequuntur mollitia natus voluptates reiciendis quos. Culpa maiores, sed
        inventore quidem voluptatibus quo deserunt perferendis qui, tempore itaque ratione dolor
        possimus? Quos corporis magni hic aspernatur nihil ducimus! Fuga.
      </Card>
    </Showcase>
  );
}

function ListShowcase() {
  return (
    <Showcase title="List">
      <Card className="grid grid-cols-1 gap-9 sm:grid-cols-2">
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
      </Card>
    </Showcase>
  );
}

export default function Page() {
  return (
    <main className="container flex max-w-screen-md flex-col gap-9 py-24">
      <div>
        <LinkButton
          href="/"
          variants={{ variant: "ghost" }}
          className="-mx-4 text-text-secondary hover:text-text-primary"
        >
          <Home /> Go back home
        </LinkButton>
      </div>
      <section className="flex flex-col gap-6">
        <div>
          <h1 className="flex flex-row items-center gap-3">
            <span className="text-3xl font-medium">glui</span>
            <span className="cursor-default select-none rounded-full bg-bg-idle px-3 py-1 text-sm text-text-secondary backdrop-blur">
              work in progress
            </span>
          </h1>
          <div className="text-lg text-text-secondary">
            A component collection based on{" "}
            <Link href="https://www.figma.com/community/file/1253443272911187215/apple-design-resources-visionos">
              visionOS UI design system
            </Link>
          </div>
        </div>
        <Button disabled>
          <Github />
          GitHub (soon)
        </Button>
      </section>
      <hr />
      <ButtonShowcase />
      <hr />
      <LinkShowcase />
      <hr />
      <CardShowcase />
      <hr />
      <ListShowcase />
    </main>
  );
}
