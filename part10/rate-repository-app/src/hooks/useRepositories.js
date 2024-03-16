import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = () => {
  const [repositories, setRepositories] = useState()

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    if (!loading) {
      // console.log(data);
      setRepositories(data.repositories)
    }
    if (error) {
      console.log(error)
    }
  }, [data, error, loading])

  return repositories
}

export default useRepositories
