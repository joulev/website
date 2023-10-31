import { redirect } from "next/navigation";

import { getClient } from "~/lib/graphql";

import { auth } from "./config";

export async function getSession() {
  const session = await auth();
  if (!session) redirect("/sign-in");
  return session;
}

export async function getAuthenticatedGraphQLClient() {
  const session = await getSession();
  return getClient(session.accessToken);
}
