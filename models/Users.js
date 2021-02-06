const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    passwordHash: String
})


const User = mongoose.model('users', userSchema)

module.exports = User


// 1 user:
// {"name": "test", "password": "another Test2"}