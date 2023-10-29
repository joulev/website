import { Card } from "~/components/ui/card";

import { Sidebar } from "./sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container max-w-screen-lg">
      <Card className="flex flex-col p-0 md:flex-row">
        <Sidebar />
        <div className="flex max-w-full flex-grow flex-col divide-y divide-separator overflow-x-auto">
          {children}
        </div>
      </Card>
    </main>
  );
}
