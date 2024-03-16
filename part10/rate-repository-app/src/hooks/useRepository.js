import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

import { GET_REPOSITORY } from '../graphql/queries'

const useRepository = (id) => {
  const [repository, setRepository] = useState()

  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id },
  })

  useEffect(() => {
    if (!loading) {
      // console.log('here data', data.repository);
      setRepository(data.repository)
    }
    if (error) {
      console.log(error)
    }
  }, [data, error, loading])

  return repository
}

export default useRepository
