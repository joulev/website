import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

export function getClient(token?: string) {
  const httpLink = createHttpLink({ uri: "https://graphql.anilist.co" });
  const authLink = setContext((_, { headers: initHeaders }) => {
    const headers = initHeaders as RequestInit["headers"];
    return token ? { headers: { ...headers, authorization: `Bearer ${token}` } } : { headers };
  });
  return new ApolloClient({ link: authLink.concat(httpLink), cache: new InMemoryCache() });
}
