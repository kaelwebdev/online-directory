import { useQuery, useMutation } from '@apollo/client'
import { ALL_PERSONS } from './queries'
import { CREATE_PERSON, EDIT_PHONE, LOGIN } from './mutations'

export const usePersons = () => {
    const result = useQuery(ALL_PERSONS);
    return result; //return {data, error, loading}
}

export const useCreatePerson = () => {
    const [createPerson,  { data, loading, error }] = useMutation(
        CREATE_PERSON,
        { 
            refetchQueries: [
                {
                    query: ALL_PERSONS
                }
            ],
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
                return {
                    message: error.graphQLErrors[0].message,
                    code: error.graphQLErrors[0]?.extensions?.code
                }
            }
        }
    )
    return [createPerson,  { data, loading, error }];
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
                return {
                    message: error.graphQLErrors[0].message,
                    code: error.graphQLErrors[0]?.extensions?.code
                }
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
                return {
                    message: error.graphQLErrors[0].message,
                    code: error.graphQLErrors[0]?.extensions?.code
                }
            }
        }
    )
    return [login,  { data, loading, error }];
}