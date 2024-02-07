import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import graphqlLogo from './assets/graphql.svg'
import apollosLogo from './assets/apollo.svg'
import './App.css'
import { Persons } from './Personas'
import PersonForm from './PersonForm'
import { usePersons } from './persons/custom_hooks'
import { PhoneForm } from './PhoneForm'
import LoginForm from './LoginForm'
import { useApolloClient } from '@apollo/client'
import { useState } from "react";

function App() {

  const {data, loading,  error} = usePersons();
  const [token, setToken] = useState(()=> localStorage.getItem('directorio_social_token'))
  const client = useApolloClient() //pendiente separar esta logica como customhook

  const logout = () => {
    //pendiente separar esta logica como customhook
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }


  if (error) return <span style={'color: red'}>{error}</span>
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://graphql.org/" target="_blank">
          <img src={graphqlLogo} className="logo graphql" alt="Graphql logo" />
        </a>
        <a href="https://www.apollographql.com/docs/" target="_blank">
          <img src={apollosLogo} className="logo apollo" alt="Apollo logo" />
        </a>
      </div>
      <h1>
        (GraphQL + Apollo Server) +
        <br/>
        (React + Vite + GraphQL + Apollo Client)
        </h1>
      {
        loading ? <p>...Loading</p> :
        (
          <>
            {token ? <button onClick={logout}>Logout</button> : <LoginForm setToken={setToken}/>}
            <Persons persons={data?.allPersons}/>
            <PersonForm/>
            <PhoneForm/>
          </>
        )
      }
     
    </>
  )
}

export default App
