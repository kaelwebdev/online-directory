# Example online cell phone directory . MongoDB + Apollo + GraphQL + React

## Main Technologies
### Backend
(GraphQL + Apollo Server) + MongoDB
### Front
(React + Vite + GraphQL + Apollo Client)

## Others
Mongoose

## How to Start?
0. Crear archivo .env.local en (/directorio/backend) usando como referencia .env.example
asignando el valor correspondiente

1. Usa tu conexion de MongoDB Cloud (en /directorio/backend/db.js)
```
const MONGODB_URI = `mongodb+srv://<user>:<password>@<cluster>.<identificador>.mongodb.net/?retryWrites=true&w=majority`
```
2. Start backend server (GraphQL + Apollo Server). (/directorio/backend)
```
npx nodemon --env-file .env.local index.js
```
3. Start frontend app. (/directorio/frontend)
```
npm run dev
```

