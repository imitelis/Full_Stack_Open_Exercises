import { useApolloClient, useMutation } from '@apollo/client'
import { CREATE_REVIEW } from '../graphql/mutations'

const useReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW)
  const apolloClient = useApolloClient()

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    // call the mutate function here with the right arguments
    const result = await mutate({
      variables: { review: { ownerName, repositoryName, rating, text } },
    })
    apolloClient.resetStore()
    return result
  }
  return [createReview, result]
}

export default useReview
