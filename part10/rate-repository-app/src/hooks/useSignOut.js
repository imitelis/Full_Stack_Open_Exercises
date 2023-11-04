import { useApolloClient } from '@apollo/client'

import useAuthStorage from '../hooks/useAuthStorage'

const useSignOut = () => {
  const apolloClient = useApolloClient()
  const authStorage = useAuthStorage()

  const signOut = async () => {
    await authStorage.removeAccessToken()
    apolloClient.resetStore()

    return null
  }

  return [signOut]
}

export default useSignOut
