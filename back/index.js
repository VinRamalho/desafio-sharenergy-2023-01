require('dotenv').config()
const express = require("express");
const app = express()
const mongoose = require('mongoose')

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


// // conexao mongo
// const DB_USER = process.env.DB_USER
// const DB_PASSWORD = process.env.DB_PASSWORD

const DB_USER = "root"
const DB_PASSWORD = "root"


mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.ihvl0zu.mongodb.net/crud-api-users?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Conectado no MongoDb!');
        app.listen(8000)

    })
    .catch((err) => { console.log(err); })


