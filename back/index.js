require('dotenv').config()
const express = require("express");
const app = express()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Ler json
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

// cors
var cors = require('cors');
app.use(cors());

// Routes
const personRutes = require('./routes/personRoutes')
app.use('/api/create', personRutes)
app.use('/api/read', personRutes)

const loginRoutes = require('./routes/loginRouter')
app.use('/api/auth/register', loginRoutes)
app.use('/api/auth/login', loginRoutes)



// // conexao mongo
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD



mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.ihvl0zu.mongodb.net/crud-api-users?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Conectado no MongoDb!');
        app.listen(8000)

    })
    .catch((err) => { console.log(err); })


