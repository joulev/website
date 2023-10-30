import { graphql } from "~/lib/gql/gql";

export { MediaListStatus } from "~/lib/gql/graphql";
export type { GetUserQuery as GetUser } from "~/lib/gql/graphql";

export const GET_USER = graphql(/* GraphQL */ `
  query GetUser {
    Viewer {
      id
    }
  }
`);
