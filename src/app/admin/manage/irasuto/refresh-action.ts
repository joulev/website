"use server";

import { revalidateTag } from "next/cache";

// eslint-disable-next-line @typescript-eslint/require-await -- Server actions must be async
export async function refreshIrasuto() {
  revalidateTag("photos");
}
