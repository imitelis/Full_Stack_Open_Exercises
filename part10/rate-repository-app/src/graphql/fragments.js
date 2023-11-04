import { gql } from '@apollo/client'

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    createdAt
    description
    forksCount
    fullName
    id
    language
    name
    openIssuesCount
    ownerAvatarUrl
    ownerName
    ratingAverage
    reviewCount

    stargazersCount
    url

    userHasReviewed
    watchersCount
  }
`

export const USER_DETAILS = gql`
  fragment UserDetails on User {
    id
    username
  }
`
