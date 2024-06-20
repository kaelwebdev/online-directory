import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import graphqlLogo from './assets/graphql.svg'
import apollosLogo from './assets/apollo.svg'
import './App.css'
import { Persons } from './Personas'
import PersonForm from './PersonForm'
import { usePersons } from './persons/custom_hooks'
import { useUsers } from './users/custom_hooks'
import { PhoneForm } from './PhoneForm'
import LoginForm from './LoginForm'
import { useApolloClient, useSubscription } from '@apollo/client'
import { useState } from "react";
import { PERSON_ADDED } from './persons/subscriptions'
import { ALL_PERSONS } from './persons/queries'
import UserForm from './UserForm'
import { ListOfUsers } from './ListOfUsers'

const useSubscriptions = (client) => {
  
}

function App() {

  const {data, loading,  error} = usePersons();
  const {data:dataUsers, loading:loadingUsers,  error:errorUsers} = useUsers();

  const [token, setToken] = useState(()=> localStorage.getItem('directorio_social_token'))
  const client = useApolloClient() //pendiente separar esta logica como customhook
  const {data:data2, loading:loading2,  error:error2 } = useSubscription(
    PERSON_ADDED, { 
      onData: ({data})=> {
        const {subscrPersonAdded} = data.data;
        const dataInStoreQuery = client.readQuery({ query: ALL_PERSONS });
        client.writeQuery({
          query: ALL_PERSONS,
          data: {
            ...dataInStoreQuery,
            allPersons: [
              ...dataInStoreQuery.allPersons,
              subscrPersonAdded
            ]
          }
        })
      },
      //onError: (error) => {},
      //onComplete: (some) => {}
    }
  );
  const logout = () => {
    //pendiente separar esta logica como customhook
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <>
    {
      error && (<span style={{color: "red", fontSize: "30px"}}>
        {error.message + " (check the network or try later)"}
      </span>)
    }
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
            <div className='main_grid'>
              <div>
                {token ? <button onClick={logout}>Logout</button> : <LoginForm setToken={setToken}/>}
                <ListOfUsers users={dataUsers?.allUsers}/>
                <Persons persons={data?.allPersons}/>
              </div>
              <div>
                <PersonForm/>
                <PhoneForm/>
                <UserForm />
              </div>
            </div>
          </>
        )
      }
     
    </>
  ) 
}

export default App
