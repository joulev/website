import { GraphQLClient } from "graphql-request";

export function getClient(token?: string) {
  return new GraphQLClient("https://graphql.anilist.co", {
    fetch,
    headers: token ? { authorization: `Bearer ${token}` } : undefined,
  });
}
