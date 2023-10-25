import { gql } from "@apollo/client";

import { REPOSITORY_DETAILS } from "./fragments";

export const ALL_REPOSITORIES = gql`
  query Repositories {
    repositories {
        edges {
            node {
              ...RepositoryDetails
            }
        }
    }
  }
  ${REPOSITORY_DETAILS}
`;