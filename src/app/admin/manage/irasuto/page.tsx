import { Collage } from "~/components/irasuto/collage";
import { Card } from "~/components/ui/card";
import { getPhotos } from "~/lib/irasuto/get-photos";

export default async function Page() {
  const photos = await getPhotos();
  return (
    <main className="container">
      <Card className="flex flex-col p-0">
        <Collage photos={photos} allowDelete />
      </Card>
    </main>
  );
}
