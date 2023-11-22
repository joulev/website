import { Trash } from "lucide-react";

import { Button } from "~/components/ui/button";
import { removePhoto } from "~/lib/irasuto/remove-photo";

export function DeleteButton({ storageKey }: { storageKey: string }) {
  const action = removePhoto.bind(null, storageKey);
  return (
    <form className="absolute right-3 top-3 transition sm:-translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
      <Button variants={{ size: "sm" }} formAction={action} type="submit">
        <Trash /> Remove
      </Button>
    </form>
  );
}
