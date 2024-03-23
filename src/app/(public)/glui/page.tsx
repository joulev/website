import type { Metadata } from "next";
import { Title } from "~/components/title";
import { Card } from "~/components/ui/card";
import { Link } from "~/components/ui/link";
import Documentation from "./documentation.mdx";

export default function Page() {
  return (
    <main className="container">
      <Card className="flex flex-col p-0">
        <div className="bg-bg-darker py-12">
          <div className="container flex max-w-screen-md flex-col gap-6">
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
          </div>
        </div>
        <div className="py-12">
          <div className="container max-w-screen-md prose">
            <Documentation />
          </div>
        </div>
      </Card>
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
