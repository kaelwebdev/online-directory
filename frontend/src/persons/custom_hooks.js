import { useQuery, useMutation } from '@apollo/client'
import { ALL_PERSONS } from './queries'
import {
    CREATE_PERSON,
    CREATE_USER,
    EDIT_PHONE,
    LOGIN
} from './mutations'

export const usePersons = () => {
    const result = useQuery(ALL_PERSONS);
    return result; //return {data, error, loading}
}


const handleError = (error)=> {
    const message = error.message || "Error";
    const code = "";
    return {
        message,
        code
    }
}

export const useCreatePerson = () => {
    const [createPerson,  { data, loading, error }] = useMutation(
        CREATE_PERSON,
        { 
            /* refetchQueries: [
                {
                    query: ALL_PERSONS
                }
            ], */
           /* update: (store, response) => {
                const dataInStoreQuery = store.readQuery({ query: ALL_PERSONS});
                store.writeQuery({
                    query: ALL_PERSONS,
                    data: {
                        ...dataInStoreQuery,
                        allPersons: [
                            ...dataInStoreQuery.allPersons,
                            response.data.addPerson
                        ]
                    }
                })
            },*/
            onError: (error) => {
                return handleError(error)
            }
        }
    )
    return [createPerson,  { data, loading, error }];
}

export const useCreateUser = () => {
    const [createUser,  { data, loading, error }] = useMutation(
        CREATE_USER,
        { 
            onError: (error) => {
                return handleError(error)
            }
        }
    )
    return [createUser,  { data, loading, error }];
}

export const useUpdatePhone = () => {
    const [editPhone,  { data, loading, error }] = useMutation(
        EDIT_PHONE,
        { 
            /*refetchQueries: [
                {
                    query: ALL_PERSONS
                }
            ],*/
            onError: (error) => {
                return handleError(error)
            }
        }
    )
    return [editPhone,  { data, loading, error }];
}

export const useLogin = () => {
    const [login,  { data, loading, error }] = useMutation(
        LOGIN,
        { 
            /*refetchQueries: [
                {
                    query: ALL_PERSONS
                }
            ],*/
            onError: (error) => {
                return handleError(error)
            }
        }
    )
    return [login,  { data, loading, error }];
}
