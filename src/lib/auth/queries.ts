import { graphql } from "~/lib/gql/gql";

export const GET_USER = graphql(/* GraphQL */ `
  query GetUser {
    Viewer {
      id
    }
  }
`);
