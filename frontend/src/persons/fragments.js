import { gql } from '@apollo/client'

export const FRAGMENT_ALL_PERSON_DETAILS = gql`
fragment PersonDetails on Person {
    id
    name
    phone
    address {
        city
        street
    }
}
`