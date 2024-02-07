import { gql, useLazyQuery } from '@apollo/client'

const FIND_PERSON = gql`
query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
        name
        phone
        id
        address {
            street
            city
        }
    }
}
`
export const FindPerson = () => {
    const [getPerson, result] = useLazyQuery(FIND_PERSON)
    return [getPerson, result]
}