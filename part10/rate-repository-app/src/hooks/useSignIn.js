import { useApolloClient, useMutation } from '@apollo/client'

import useAuthStorage from '../hooks/useAuthStorage'

import { LOGIN_USER } from '../graphql/mutations'

const useSignIn = () => {
  const [mutate, result] = useMutation(LOGIN_USER)

  const apolloClient = useApolloClient()
  const authStorage = useAuthStorage()

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const result = await mutate({
      variables: { credentials: { username, password } },
    })
    await authStorage.setAccessToken(result.data.authenticate.accessToken)
    await apolloClient.resetStore()
    return result
  }

  return [signIn, result]
}

export default useSignIn
