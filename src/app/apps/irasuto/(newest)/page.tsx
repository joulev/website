import { Collage } from "../collage";
import { getPhotos } from "../get-photos";

export default async function Page() {
  const photos = await getPhotos();
  return <Collage photos={photos} />;
}
