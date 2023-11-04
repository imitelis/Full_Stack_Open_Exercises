import { gql } from '@apollo/client'

import { REPOSITORY_DETAILS, USER_DETAILS } from './fragments'

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
`

export const AUTHENTICATE_ME = gql`
  query Authenticate {
    me {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`
