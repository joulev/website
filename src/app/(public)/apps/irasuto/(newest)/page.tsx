import { Collage } from "~/components/irasuto/collage";
import { getPhotos } from "~/lib/irasuto/get-photos";

export default async function Page() {
  const photos = await getPhotos();
  return <Collage photos={photos} />;
}
