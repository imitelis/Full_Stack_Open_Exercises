import { gql } from '@apollo/client'

import { REPOSITORY_DETAILS, USER_DETAILS } from './fragments'

export const GET_REPOSITORIES = gql`
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

export const GET_FILTERED_REPOSITORIES = gql`
  query Query(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
  ) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
      edges {
        node {
          ...RepositoryDetails
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`

export const GET_REPOSITORY = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      ...RepositoryDetails
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
