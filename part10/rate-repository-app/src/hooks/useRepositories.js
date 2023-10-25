import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { ALL_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const [repositories, setRepositories] = useState();

  const { data, error, loading } = useQuery(ALL_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      setRepositories(data.repositories);
    }
  });

  /*
  const fetchRepositories = async () => {

    // Replace the IP address part with your own IP address!
    

  };

  useEffect(() => {
    fetchRepositories();
  }, []);
  */

  useEffect(() => {
    if (!data || error) {
      // console.log(error)
    }
  }, [error]);

return { repositories, loading, /* refetch : fetchRepositories */ };
};

export default useRepositories;