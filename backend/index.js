import { ApolloServer } from '@apollo/server';
import { startStandaloneServer} from '@apollo/server/standalone';
import './db.js'
import Person from './models/person.js';
import User from './models/user.js'
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken'


const JWT_SECRET = process.env.JWT_SECRET // JSON Web Token secret word

const typeDefinitions = `
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

`
const resolvers = {
    Query: {
        personCount: () => Person.collection.countDocuments(),
        allPersons: async (root, args) => {
            if (!args.withPhone) return Person.find({})
            return Person.find({phone: {$exists: args.withPhone === 'YES'}})
        },
        findPerson: async (root, args) => {
            const {name} = args
            return Person.findOne({name})
        },
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Person: {
        address: (root) => {
            return {
                city: root.city,
                street: root.street
            }
        }
    },
    Mutation: {
        addPerson: async (root, args, context) => {
            const { currentUser } = context

            if (!currentUser) {
                throw new GraphQLError("You need to be a registered user to perform this operation", {
                    extensions: {
                      code: 'UNAUTHORIZED_ERROR'
                    }
                });
            }

            const person = new Person({...args})

            try {
                await person.save()
                currentUser.friends = currentUser.friends.concat(person)
                await currentUser.save()
            } catch (error) {
                throw new GraphQLError("Error when trying to create a person", {
                    extensions: {
                      code: 'USER_INPUT_ERROR'
                    }
                });
            }
            return person
        },
        editNumber: async (root, args) => {
            const person = await Person.findOne({name: args.name})
            if (!person) return

            person.phone = args.phone
            try {
                await person.save()
            } catch (error) {
                throw new GraphQLError("Error when trying to modify a number", {
                    extensions: {
                      code: 'USER_INPUT_ERROR'
                    }
                });
            }
            return person
        },
        createUser: (root, args) => {
            const user = new User({username: args.username});
            return user.save().catch( error => {
                console.log(error);
                throw new GraphQLError("Error when trying to create a User", {
                    extensions: {
                      code: 'USER_INPUT_ERROR'
                    }
                });
            })
        },
        login: async(root, args) => {
            const user = await User.findOne({ username: args.username});

            //Pendiente hacer validacion de password real
            if (!user || args.password !== 'pwdsecret') {
                throw new GraphQLError("wrong credentials", {
                    extensions: {
                      code: 'USER_INPUT_ERROR'
                    }
                });
            }

            const userForToken = {
                username: user.username,
                id: user._id
            }

            return {
                value: jwt.sign(userForToken, JWT_SECRET)
            }
        },
        addAsFriend: async (root, args, context) => {
            const { currentUser } = context

            if (!currentUser) {
                throw new GraphQLError("You need to be a registered user to perform this operation", {
                    extensions: {
                      code: 'UNAUTHORIZED_ERROR'
                    }
                });
            }

            const person = await Person.findOne({name: args.name})
            const isFriend = currentUser.friends.some(friend => friend._id.equals(person._id));
            
            if (!isFriend) {
                currentUser.friends = currentUser.friends.concat(person);
                await currentUser.save()
            } else {
                throw new GraphQLError("The user cannot become a friend again because he or she is already your friend.", {
                    extensions: {
                      code: 'LOGICAL_USER_ERROR'
                    }
                });
            }

            return currentUser
        }
    }
}

const server = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers,
    formatError: (error) => {
        delete error.extensions.stacktrace;
        delete error.path;
        delete error.locations;
        return error;
    },
    
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({req}) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.toLowerCase().startsWith("bearer ")) {
            const token = auth.substring(7);
            const {id} = jwt.verify(token, JWT_SECRET);
            const currentUser = await User.findById(id).populate('friends')
            return { currentUser }
        }
    }
});

console.log(`🚀  Server ready at: ${url}`);
