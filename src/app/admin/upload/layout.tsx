import { Card } from "~/components/ui/card";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container max-w-screen-sm">
      <Card className="flex flex-col gap-6">{children}</Card>
    </main>
  );
}
