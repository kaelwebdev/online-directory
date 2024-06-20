import { useQuery } from '@apollo/client'
import { ALL_USERS } from './queries'

export const useUsers = () => {
    const result = useQuery(ALL_USERS);
    return result; //return {data, error, loading}
}