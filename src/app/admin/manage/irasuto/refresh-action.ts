"use server";

import { revalidateTag } from "next/cache";

export async function refreshIrasuto() {
  revalidateTag("photos");
}
