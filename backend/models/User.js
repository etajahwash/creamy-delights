const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 3,

    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 2406
    }
});

const User = mongoose.model('User', userSchema)

module.exports = User;