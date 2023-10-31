import { redirect } from "next/navigation";

import { Logo } from "~/components/logo";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Link } from "~/components/ui/link";
import { auth, signIn } from "~/lib/auth/config";

export default async function Page() {
  const session = await auth();
  if (session) redirect("/admin");
  return (
    <main className="container max-w-md pb-12 pt-24">
      <Card>
        <form
          className="flex flex-col items-center gap-6"
          action={async () => {
            "use server";
            await signIn("anilist", { redirect: true, redirectTo: "/admin" });
          }}
        >
          <Link
            href="/"
            unstyled
            className="text-text-secondary transition hover:text-text-primary"
          >
            <Logo className="fill-current" />
          </Link>
          <h1 className="text-3xl font-bold">Welcome</h1>
          <Button type="submit" variants={{ variant: "primary" }} className="w-full">
            Sign in as @joulev
          </Button>
        </form>
      </Card>
    </main>
  );
}
