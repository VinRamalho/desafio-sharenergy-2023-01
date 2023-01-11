const mongoose = require('mongoose')

const Login = mongoose.model('Login', {
    login: String,
    password: String
})

module.exports = Login;