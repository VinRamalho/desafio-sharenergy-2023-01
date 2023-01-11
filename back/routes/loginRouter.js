const router = require("express").Router()
const Login = require('../moldels/Login')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()



// router.post('/', async (req, res) => {
//     const { login, password } = req.body;

//     if (!login) {
//         res.status(422).json({ error: 'Login é obrigatorio' })
//         return
//     }
//     if (!password) {
//         res.status(422).json({ error: 'Senha é obrigatorio' })
//         return
//     }

//     const salt = await bcrypt.genSalt(12)
//     const passwordHash = await bcrypt.hash(password, salt)

//     const newLogin = new Login({
//         login,
//         password: passwordHash,
//     })

//     try {
//         await newLogin.save()

//         res.status(200).json({ message: "Login registrado com sucesso" })

//     } catch (error) {
//         res.status(500).json({ error: error })
//     }

// })


router.post('/', async (req, res) => {
    const { login, password } = req.body;

    if (!login) {
        res.status(422).json({ error: 'Login é obrigatorio' })
        return
    }
    if (!password) {
        res.status(422).json({ error: 'Senha é obrigatorio' })
        return
    }

    const user = await Login.findOne({ login: login })

    if (!user) {
        res.status(404).json({ error: 'Usuario não encontrado' })
        return
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
        res.status(422).json({ error: 'Senha invalida' })
        return
    }
    try {

        const secret = process.env.SECRET

        const token = jwt.sign({
            id: user._id
        },
            secret,
        )

        res.status(200).json(
            {
                message: "Autenticação realizada com sucesso",
                user: {
                    id: user._id,
                    username: user.login
                }, token
            })

    } catch (error) {
        res.status(500).json({ error: error })
    }

})




module.exports = router; 