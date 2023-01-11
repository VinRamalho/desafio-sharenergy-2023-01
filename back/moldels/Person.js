const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
    name: String,
    email: String,
    phone: String,
    address: String,
    cpf: String
})

module.exports = Person;