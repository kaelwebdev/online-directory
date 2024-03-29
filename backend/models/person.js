import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const shema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    phone: {
        type: String,
        minlength: 5
    },
    city: {
        type: String,
        required: true,
        minlength: 3
    },
    street: {
        type: String,
        required: true,
        minlength: 5
    },
})

shema.plugin(uniqueValidator);

export default mongoose.model('Person', shema)