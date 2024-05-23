import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

import { AUTHENTICATE_USER } from '../graphql/queries'

const useAuthenticate = () => {
  const [me, setMe] = useState()

  const { data, error, loading } = useQuery(AUTHENTICATE_USER, {
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    if (!loading) {
      if (data && data.me) {
        setMe(data.me)
      } else {
        console.log(error)
      }
    }
  }, [data, error, loading])

  return me
}

export default useAuthenticate
