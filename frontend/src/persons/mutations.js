import { gql } from '@apollo/client'
//import { FRAGMENT_ALL_PERSON_DETAILS } from './fragments'

export const CREATE_PERSON = gql`
mutation createPerson($name: String!, $phone: String, $city: String!, $street: String!)
{
    addPerson(
        name: $name
        phone: $phone
        city: $city
        street: $street
    ) {
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

export const EDIT_PHONE = gql`
mutation editPhone($name: String!, $phone: String!)
{
    editNumber(
        name: $name
        phone: $phone
    ) {
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
export const LOGIN = gql`
mutation login($username: String!, $password: String!)
{
    login(username: $username, password: $password) {
        value
    }
}

`



