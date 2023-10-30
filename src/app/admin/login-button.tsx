"use client";

import { signIn, signOut } from "next-auth/react";

export function LoginButton() {
  return (
    <button type="button" onClick={() => signIn("anilist")}>
      Log in
    </button>
  );
}

export function LogoutButton() {
  return (
    <button type="button" onClick={() => signOut()}>
      Log out
    </button>
  );
}
