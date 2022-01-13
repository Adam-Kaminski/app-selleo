import { useEffect, useState, useMemo } from 'react';
import { ApolloProvider } from '@apollo/client';
import { getNewClient } from './api';
import { useAuth0 } from '@auth0/auth0-react';

const ApolloSetup = ({ children }) => {
  const [token, setToken] = useState(null);
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently({
        audience: 'graphql-api',
        scope: 'read',
      })
        .then((token) => {
          setToken(token);
        })
        .catch((e) => console.warn(e));
    } else {
      localStorage.removeItem('token');
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  const client = useMemo(() => {
    return getNewClient(token);
  }, [token]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloSetup;
