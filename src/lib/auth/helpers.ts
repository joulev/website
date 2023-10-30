import { getServerSession } from "next-auth";

import { getClient } from "~/lib/apollo/client";

import { authOptions } from "./config";

async function getAccessToken() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Not authenticated");
  return session.accessToken;
}

export async function getAuthenticatedApolloClient() {
  const token = await getAccessToken();
  return getClient(token);
}
