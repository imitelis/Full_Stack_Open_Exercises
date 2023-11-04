import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
  mutation Mutation($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`
