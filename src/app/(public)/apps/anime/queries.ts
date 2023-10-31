import { graphql } from "~/lib/gql/gql";

export { MediaListStatus } from "~/lib/gql/graphql";
export type {
  GetAnimeQuery as GetAnime,
  SearchAnimeQuery as SearchAnime,
  SearchAnimeQueryVariables as SearchAnimeVariables,
} from "~/lib/gql/graphql";

export const GET_ANIME = graphql(/* GraphQL */ `
  query GetAnime($status: MediaListStatus) {
    MediaListCollection(userName: "joulev", type: ANIME, status: $status) {
      lists {
        name
        entries {
          id
          mediaId
          score
          progress
          repeat
          advancedScores
          notes
          updatedAt
          media {
            title {
              english
              native
              romaji
            }
            coverImage {
              medium
            }
            episodes
            genres
            season
            seasonYear
          }
        }
      }
    }
  }
`);

export const SEARCH_ANIME = graphql(/* GraphQL */ `
  query SearchAnime($search: String!, $idNotIn: [Int]!) {
    Page(page: 1, perPage: 10) {
      media(
        search: $search
        id_not_in: $idNotIn
        type: ANIME
        sort: [POPULARITY_DESC, SEARCH_MATCH]
        countryOfOrigin: "JP"
      ) {
        id
        title {
          english
          romaji
          native
        }
        genres
        meanScore
        season
        seasonYear
        coverImage {
          medium
        }
      }
    }
  }
`);
