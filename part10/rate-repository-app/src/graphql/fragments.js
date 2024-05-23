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
  }
`

export const USER_DETAILS = gql`
  fragment UserDetails on User {
    id
    username
  }
`

export const REVIEW_DETAILS = gql`
  fragment ReviewDetails on Review {
    id
    rating
    text
    createdAt
    repository {
      id
      fullName
      url
    }
    user {
      id
      username
    }
  }
`
