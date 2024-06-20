import mongoose from "mongoose";

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    password: {
        type: String,
        minlength: 6
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        //validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    friends: {
        type: [
            {
                ref: 'Person',
                type: mongoose.Schema.Types.ObjectId,
            }
        ],
        default: []
    }
    
})

export default mongoose.model('User', schema);