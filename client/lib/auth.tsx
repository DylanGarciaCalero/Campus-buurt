import React, { useState, useEffect, useContext, createContext } from 'react';
import Cookies from 'js-cookie';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} from '@apollo/client';
import * as queries from '../queries';
import Redirect from '../component/Redirect';
import { useRouter } from 'next/router';

interface Props {
  children: React.ReactNode;
}

const authContext = createContext<any>(null);
const environment = `${(process.env.NODE_ENV || 'development').toLowerCase()}`;

let API_URL: any;

if (environment === 'development') {
  API_URL = 'http://localhost:3000/graphql';
} else if (environment === 'production') {
  API_URL = 'https://campus-buurt-server.herokuapp.com/graphql';
}

export const AuthProvider = ({ children }: Props) => {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [authToken, setAuthToken] = useState<any>(null);
  let router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (authToken) {
      // router.push('/');
    }
    if (token) {
      setAuthToken(token);
    }
  }, [authToken]);

  const getAuthHeaders = () => {
    if (!authToken) return null;

    return {
      authorization: `Bearer ${authToken}`,
    };
  };

  const createApolloClient = () => {
    const link = new HttpLink({
      uri: API_URL,
      headers: getAuthHeaders(),
    });

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  };

  const signOut = () => {
    Cookies.remove('token');
    setAuthToken(null);
  };

  const userSignUp = async ({ email, password, firstName, lastName }: any) => {
    const client = createApolloClient();

    const result = await client.mutate({
      mutation: queries.REGISTER_USER,
      variables: {
        input: {
          email,
          firstName,
          lastName,
          password,
        },
      },
    });

    console.log(result);
  };

  const signIn = async ({ email, password }: any) => {
    const client = createApolloClient();

    const result = await client.mutate({
      mutation: queries.LOGIN,
      variables: {
        input: {
          email,
          password,
        },
      },
    });

    if (result?.data?.login?.access_token) {
      Cookies.set('token', result.data.login.access_token, { expires: 3 });
      setAuthToken(Cookies.get('token'));
      return 'success';
    }
  };

  return {
    createApolloClient,
    signIn,
    signOut,
    userSignUp,
  };
};
