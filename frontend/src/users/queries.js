import { gql } from '@apollo/client'
import { FRAGMENT_ALL_USER_DETAILS } from './fragments'

export const ALL_USERS = gql`
query AllUsers {
  allUsers {
    ...UserDetails
  }
}

${FRAGMENT_ALL_USER_DETAILS}
`