import { redirect } from "next/navigation";

import { getClient } from "~/lib/apollo/client";

import { auth } from "./config";

export async function getSession() {
  const session = await auth();
  if (!session) redirect("/api/auth/signin");
  return session;
}

export async function getAuthenticatedApolloClient() {
  const session = await getSession();
  return getClient(session.accessToken);
}
