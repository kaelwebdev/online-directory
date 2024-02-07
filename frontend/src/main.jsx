import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApolloClient, HttpLink, gql, InMemoryCache, ApolloProvider} from '@apollo/client'

const getAuth = () => {
  const token = localStorage.getItem('directorio_social_token')
  return token ? `bearer ${token}` : null
}

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: new HttpLink(
    {
      headers: {
        authorization: getAuth()
      },
      uri: 'http://localhost:4000'
    }
  )
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
  </React.StrictMode>,
)
