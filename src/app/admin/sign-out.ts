"use server";

import { signOut } from "~/lib/auth/config";

export async function signOutAction() {
  await signOut({ redirect: true, redirectTo: "/" });
}
