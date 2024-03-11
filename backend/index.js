import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';

import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

import typeDefs from './typeDefs.js';
import resolvers from './resolvers.js';
import User from './models/user.js'

import jwt from 'jsonwebtoken'

const PORT = 4000;
const JWT_SECRET = process.env.JWT_SECRET // JSON Web Token secret word

const schema = makeExecutableSchema({ typeDefs, resolvers });
const app = express();
const httpServer = createServer(app);
const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
    
});

const serverCleanup = useServer(
    {
        schema,
        onConnect: async (ctx) => {
            //console.log("onConnect");
          },
          onDisconnect(ctx, code, reason) {
            //console.log('Disconnected!');
          },

        context: async (ctx) => {
            //console.log("context wsServer")
        }
    },
    wsServer,
)

const server = new ApolloServer({
    schema,
    plugins: [

      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),
  
      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
    formatError: (error) => {
        delete error.extensions.stacktrace;
        delete error.path;
        delete error.locations;
        return error;
    },
});

await server.start();
app.use(
    '/graphql', cors(), express.json(),
    expressMiddleware(
        server,
        {
            context: async ({req}) => {
                /* if (req.headers['user-agent'] === 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36') {
                    return {}; // Devolver el contexto vacío sin realizar ninguna acción adicional
                } */
                const authorization = req.headers.authorization;

                
                const auth = req ? req.headers.authorization : null;
                if (auth && auth.toLowerCase().startsWith("bearer ")) {
                    const token = auth.substring(7);
                    const {id} = jwt.verify(token, JWT_SECRET);

                    const currentUser = await User.findById(id).populate('friends')
                    return { currentUser }
                }
            }
        }
    )
);

httpServer.listen(PORT, () => {
    console.log(`🚀 Server is now running on http://localhost:${PORT}/graphql`);
});


