import { gql } from '@apollo/client'

export const FRAGMENT_ALL_USER_DETAILS = gql`
fragment UserDetails on User {
    id
    username
    email
    friends {
        name
    }
}
`