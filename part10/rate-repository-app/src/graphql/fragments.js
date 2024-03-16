import { gql } from '@apollo/client'

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    id
    createdAt
    description
    forksCount
    fullName
    language
    name
    openIssuesCount
    ownerAvatarUrl
    ownerName
    ratingAverage
    reviewCount
    stargazersCount
    userHasReviewed
    watchersCount
    url
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
`

export const USER_DETAILS = gql`
  fragment UserDetails on User {
    id
    username
  }
`
