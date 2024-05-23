import { useQuery } from '@apollo/client'

import { GET_REPOSITORY } from '../graphql/queries'

const useRepository = (id) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    variables: { first: 2, id },
    fetchPolicy: 'cache-and-network',
  })

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
      },
      fetchPolicy: 'cache-and-network',
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult

        return {
          repository: {
            ...fetchMoreResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],
            },
          },
        }
      },
    })
  }

  return {
    repository: data?.repository,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  }
}

export default useRepository
