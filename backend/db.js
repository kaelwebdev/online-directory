import mongoose from "mongoose";

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}@${process.env.MONGODB_CLUSTER}.${process.env.MONGODB_IDENTIFIER}.mongodb.net/?retryWrites=true&w=majority`

export const runDBConnection = async () => {

    return  await mongoose.connect(MONGODB_URI, {
        /*useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true*/ // opciones ya no compatibles
    }).then( () => {
        console.log('connected to MongoDB')
        const mongooseInfo = {
            status: "ok",
            connectionDb: mongoose.connection.db
        }
        return mongooseInfo
    }).catch( error => {
        console.error('error connection to MongoDB', error.message);
        return {status: "error"}
    })
}

process.on('SIGINT', function () {
    mongoose.connection.close();
  });

