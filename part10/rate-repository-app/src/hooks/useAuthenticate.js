import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

import { AUTHENTICATE_ME } from '../graphql/queries'

const useAuthenticate = () => {
  const [me, setMe] = useState()

  const { data, error, loading } = useQuery(AUTHENTICATE_ME, {
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    if (!loading) {
      // console.log(data);
      setMe(data.me)
    }
    if (error) {
      console.log(error)
    }
  }, [data, error, loading])

  return me
}

export default useAuthenticate
