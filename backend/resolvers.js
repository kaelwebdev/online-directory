import Person from './models/person.js';
import User from './models/user.js'
import { GraphQLError } from 'graphql';
import { runDBConnection } from './db.js'
import { MongodbPubSub } from 'graphql-mongodb-subscriptions';
import jwt from 'jsonwebtoken'
//import { v4 as uuidv4 } from 'uuid';
import { encryptPassword, verifyPassword } from './utils/userAuth.js';

const { connectionDb } = await  runDBConnection();
const pubsub = new MongodbPubSub({ connectionDb});
const TRIGGER_PERSON_ADDED = 'TRIGGER_PERSON_ADDED';
const JWT_SECRET = process.env.JWT_SECRET // JSON Web Token secret word

const  resolvers = {
    Query: {
        personCount: () => Person.collection.countDocuments(),
        allPersons: async (root, args) => {
            if (!args.withPhone) return Person.find({})
            return Person.find({phone: {$exists: args.withPhone === 'YES'}})
        },
        allUsers: async (root, args) => {
            const users = await User.find().populate('friends').exec();
            console.log(users);
            return users;
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
        id: (root) => {
            return root._id.toString();
        },
        address: (root) => {
            return {
                city: root.city,
                street: root.street
            }
        }
    },
    User: {
        friends: (root) => {
            return root.friends || [];
        },
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
            let person = new Person({...args})

            try {
                await person.save();
                await pubsub.publish(TRIGGER_PERSON_ADDED, {subscrPersonAdded: person});
                currentUser.friends = currentUser.friends.concat(person)
                await currentUser.save()
                return person
            } catch (error) {
                throw new GraphQLError("Error when trying to create a person", {
                    extensions: {
                      code: 'USER_INPUT_ERROR',
                    }
                });
            }

           
            
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
        createUser: async (root, args) => {
            console.log("createUser...")
            console.log(args)
            let hashedPassword
            try {
                hashedPassword = await encryptPassword(args.password, 10);
                console.log('Contraseña encriptada:', hashedPassword);
            } catch (error) {
                console.error('Error al encriptar la contraseña:', error);
                throw new GraphQLError("Error when trying to encrypt a password", {
                    extensions: {
                      code: 'USER_ENCRYPT_ERROR'
                    }
                });
            }

            const user = new User(
                {
                    username: args.username,
                    password: hashedPassword,
                    email: args.email
                }
            );


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
            const isMatch = await verifyPassword(args.password, user.password);
            
            if (!user || !isMatch) {
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
                value: jwt.sign(userForToken, JWT_SECRET, { expiresIn: '1h' })
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
    },
    Subscription: {
        subscrPersonAdded: {
            subscribe: () => pubsub.asyncIterator(TRIGGER_PERSON_ADDED)
        }
    }
}

export default resolvers;