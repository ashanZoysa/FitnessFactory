//user or user accounts collection model
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({

    username : {
        type: String,
        required: true,
        unique: true
    },

    password : {
        type: String,
        required: true
    },

    accType: {
        type: String,
        enum: ['customer', 'instructor'],
        default: 'customer'
    },

    accLevel: {
        type: Number,
        default: 1
    }
})

const User = mongoose.model('users', userSchema);

module.exports = User;