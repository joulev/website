"use server";

import { updateTag } from "next/cache";

export async function refreshIrasuto() {
  updateTag("photos");
}
