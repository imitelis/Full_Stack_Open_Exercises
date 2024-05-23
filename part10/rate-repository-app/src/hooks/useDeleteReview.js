import { useApolloClient, useMutation } from '@apollo/client'
import { DELETE_REVIEW } from '../graphql/mutations'

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW)
  const apolloClient = useApolloClient()

  const deleteReview = async (reviewId) => {
    const result = await mutate({
      variables: { reviewId },
    })
    await apolloClient.resetStore()
    return result
  }
  return [deleteReview, result]
}

export default useDeleteReview
