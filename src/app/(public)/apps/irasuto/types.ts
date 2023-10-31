import type { IrasutoPhoto } from "~/lib/db/schema";

export type Photo = Omit<IrasutoPhoto, "date">;
