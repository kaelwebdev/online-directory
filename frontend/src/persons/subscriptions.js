import { gql } from '@apollo/client'
//import {  } from './fragments'

export const PERSON_ADDED = gql`
subscription SubscrPersonAdded {
    subscrPersonAdded {
        id
        name
        phone
        address {
            city
            street
        }
    }
}
`