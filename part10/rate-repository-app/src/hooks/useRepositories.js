import { useQuery } from '@apollo/client'

import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (filterType, searchWord) => {
  let orderBy, orderDirection

  switch (filterType) {
    case 'LATEST':
      orderBy = 'CREATED_AT'
      orderDirection = 'DESC'
      break
    case 'HIGHEST_RATED':
      orderBy = 'RATING_AVERAGE'
      orderDirection = 'DESC'
      break
    case 'LOWEST_RATED':
      orderBy = 'RATING_AVERAGE'
      orderDirection = 'ASC'
      break
    default:
      orderBy = 'CREATED_AT'
      orderDirection = 'DESC'
  }

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables: { first: 8, orderBy, orderDirection, searchKeyword: searchWord },
    fetchPolicy: 'cache-and-network',
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        orderBy,
        orderDirection,
        searchKeyword: searchWord,
      },
      fetchPolicy: 'cache-and-network',
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult

        return {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        }
      },
    })
  }

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  }
}

export default useRepositories
