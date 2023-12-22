import { Collage } from "~/components/irasuto/collage";
import { Card } from "~/components/ui/card";
import { getPhotos } from "~/lib/irasuto/get-photos";

import { RefreshButton } from "./refresh";

export default async function Page() {
  const photos = await getPhotos();
  return (
    <main className="container">
      <Card className="p-0">
        <Collage photos={photos} allowDelete />
      </Card>
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2">
        <RefreshButton />
      </div>
    </main>
  );
}
