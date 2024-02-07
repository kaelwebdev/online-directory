import { gql } from '@apollo/client'
import { FRAGMENT_ALL_PERSON_DETAILS } from './fragments'

export const ALL_PERSONS = gql`
    query AllPersons {
      allPersons {
        ... PersonDetails
      }
    }

  ${FRAGMENT_ALL_PERSON_DETAILS}
`