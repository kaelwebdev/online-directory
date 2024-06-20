# Example online cell phone directory . MongoDB + Apollo + GraphQL + React

## Main Technologies
### Backend
(GraphQL + Apollo Server) + MongoDB
### Front
(React + Vite + GraphQL + Apollo Client)

## Others
Mongoose, jsonwebtoken, bcrypt

## What is online-directory?
The application allows users to add friends who would actually be phone contacts. The added phones will be available to all users. This app remembers the old telephone directories of the past.

## How to Start?
0. Crear archivo .env.local en (/online-directory/backend) usando como referencia .env.example
asignando el valor correspondiente

1. Use your MongoDB Cloud connection (en /online-directory/backend/db.js).
Don't forget to create your .env.local file with the environment variables noted in .env.example
```
const MONGODB_URI = `mongodb+srv://<user>:<password>@<cluster>.<identificador>.mongodb.net/?retryWrites=true&w=majority`
```
2. Start backend and front server. (/online-directory)
```
npm run dev
```
### You can also start the servers independently
1. Start backend server (GraphQL + Apollo Server). (/online-directory/backend)
```
npx nodemon --env-file .env.local index.js
```
2. Start frontend app. (/online-directory/frontend)
```
npm run dev
```
