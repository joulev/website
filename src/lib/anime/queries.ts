import { graphql } from "~/lib/gql/gql";

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
          updatedAt
          media {
            title {
              english
              romaji
            }
            coverImage {
              medium
            }
            episodes
            season
            seasonYear
            format
            status
            nextAiringEpisode {
              episode
            }
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
        }
        genres
        meanScore
        season
        seasonYear
      }
    }
  }
`);
