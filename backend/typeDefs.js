const typeDefs = `
    enum YesNo{
        YES
        NO
    }
    type Address {
        city: String!
        street: String!
    }

    type Person {
        id: String!
        name: String!
        phone: String
        address: Address!
    }

    type User {
        username: String!
        friends: [Person]!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Query {
        personCount: Int!
        allPersons(withPhone:YesNo): [Person]!
        findPerson(name: String!): Person
        me: User
    }

    type  Mutation {
        addPerson(
            name: String!
            phone: String
            city: String!
            street: String!
        ): Person

        editNumber(
            name: String!
            phone: String!
        ): Person

        createUser(
            username: String!
        ): User

        login(
            username: String!
            password: String!
        ): Token

        addAsFriend(
            name: String!
        ): User
    }

    type Subscription {
        subscrPersonAdded: Person!
    }
`

export default typeDefs;