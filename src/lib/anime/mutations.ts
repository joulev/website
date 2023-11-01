import { graphql } from "~/lib/gql";

export const UPDATE_SCORE = graphql(/* GraphQL */ `
  mutation UpdateScore($id: Int!, $score: Float!, $advanced: [Float!]) {
    SaveMediaListEntry(id: $id, score: $score, advancedScores: $advanced) {
      score
      advancedScores
    }
  }
`);

export const UPDATE_PROGRESS = graphql(/* GraphQL */ `
  mutation UpdateProgress($id: Int!, $progress: Int!) {
    SaveMediaListEntry(id: $id, progress: $progress) {
      progress
    }
  }
`);

export const UPDATE_STATUS = graphql(/* GraphQL */ `
  mutation UpdateStatus($id: Int!, $status: MediaListStatus!) {
    SaveMediaListEntry(id: $id, status: $status) {
      status
    }
  }
`);

export const UPDATE_REPEAT = graphql(/* GraphQL */ `
  mutation UpdateRepeat($id: Int!, $repeat: Int!, $progress: Int!) {
    SaveMediaListEntry(id: $id, repeat: $repeat, progress: $progress) {
      repeat
      progress
    }
  }
`);

export const ADD_ANIME = graphql(/* GraphQL */ `
  mutation AddToPtw($mediaId: Int!) {
    SaveMediaListEntry(mediaId: $mediaId, status: PLANNING) {
      status
    }
  }
`);

export const DELETE_ANIME = graphql(/* GraphQL */ `
  mutation RemoveFromList($id: Int!) {
    DeleteMediaListEntry(id: $id) {
      deleted
    }
  }
`);
