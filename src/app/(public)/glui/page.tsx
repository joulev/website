import type { Metadata } from "next";
import { GitHub } from "~/components/icons";
import { Title } from "~/components/title";
import { LinkButton } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Link } from "~/components/ui/link";
import Documentation from "./documentation.mdx";

export default function Page() {
  return (
    <main className="container max-w-screen-md">
      <Card className="flex flex-col p-0">
        <div className="bg-bg-darker pt-36 relative pb-6 sm:pb-12 px-6 sm:px-12">
          <div
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg' %3E%3Ccircle cx='2' cy='2' r='2' fill='%23afafaf70' /%3E%3C/svg%3E\")",
              backgroundPosition: "13px 16px",
              maskImage: "linear-gradient(to top right, #0000 0%, #0003 50%, #000 100%)",
              WebkitMaskImage: "linear-gradient(to top right, #0000 0%, #0003 50%, #000 100%)",
            }}
          />
          <div className="flex flex-col gap-6">
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
            <div className="flex flex-col items-stretch gap-x-6 gap-y-3 sm:flex-row">
              <LinkButton
                className="w-full sm:w-auto"
                variants={{ variant: "primary" }}
                href="https://github.com/joulev/website/tree/main/src/components/ui"
              >
                <GitHub /> Component sources
              </LinkButton>
              <LinkButton
                className="w-full sm:w-auto"
                href="https://github.com/joulev/glui-starter"
              >
                Starter template
              </LinkButton>
            </div>
          </div>
        </div>
        <div className="py-12 px-6 sm:px-12">
          <div className="prose min-w-full">
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
