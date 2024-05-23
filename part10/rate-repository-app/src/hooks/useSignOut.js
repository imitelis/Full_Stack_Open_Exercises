import { useApolloClient } from '@apollo/client'

import useAuthStorage from '../hooks/useAuthStorage'

const useSignOut = () => {
  const apolloClient = useApolloClient()
  const authStorage = useAuthStorage()

  const signOut = async () => {
    await authStorage.removeAccessToken()
    await apolloClient.resetStore()
  }
  return [signOut]
}

export default useSignOut
