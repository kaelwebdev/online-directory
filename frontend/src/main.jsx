import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApolloClient, HttpLink, gql, InMemoryCache, ApolloProvider, split} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { setContext } from '@apollo/client/link/context'
//import { WebSocketLink} from '@apollo/client/link/ws'

const getAuth = () => {
  const token = localStorage.getItem('directorio_social_token')
  return token ? `bearer ${token}` : null
}

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('directorio_social_token')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null
    }
    
  }
})

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  /* headers: {
    authorization: getAuth()
  }, */
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4000/graphql'
}));


const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);



const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: splitLink
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
  </React.StrictMode>,
)
