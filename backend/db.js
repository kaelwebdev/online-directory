import mongoose from "mongoose";

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}@${process.env.MONGODB_CLUSTER}.${process.env.MONGODB_IDENTIFIER}.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(MONGODB_URI, {
    /*useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true*/ // opciones ya no compatibles
}).then( () => {
    console.log('connected to MongoDB')
}).catch( error => {
    console.error('error connection to MongoDB', error.message);
})