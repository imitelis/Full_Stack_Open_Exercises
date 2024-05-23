import { useApolloClient, useMutation } from '@apollo/client'
import { CREATE_REVIEW } from '../graphql/mutations'

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW)
  const apolloClient = useApolloClient()

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    const result = await mutate({
      variables: { review: { ownerName, repositoryName, rating, text } },
    })
    await apolloClient.resetStore()
    return result
  }
  return [createReview, result]
}

export default useCreateReview
