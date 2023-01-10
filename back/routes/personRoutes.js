const router = require("express").Router()
const Person = require('../moldels/Person')


// Create - criacao de dados
router.post('/', async (req, res) => {
    const { name, email, phone, address, cpf } = req.body

    if (!name) {
        res.status(422).json({ error: 'nome é obrigatório' })
        return
    }

    if (!email) {
        res.status(422).json({ error: 'email é obrigatório' })
        return
    }

    if (!phone) {
        res.status(422).json({ error: 'telefone é obrigatório' })
        return
    }

    if (!address) {
        res.status(422).json({ error: 'endereco é obrigatório' })
        return
    }

    if (!cpf) {
        res.status(422).json({ error: 'CPF é obrigatório' })
        return
    }

    const person = {
        name,
        email,
        phone,
        address,
        cpf
    }


    try {
        await Person.create(person)

        res.status(201).json({ message: 'pessoa inserida no sistema com sucesso!' })

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Read - leitura de dados
router.get('/', async (req, res) => {
    try {
        const people = await Person.find()
        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Buscar usuario especifico
router.get('/:id', async (req, res) => {

    const id = req.params.id

    try {
        const person = await Person.findOne({ _id: id })

        if (!person) {
            res.status(422).json({ error: 'Usuário não encontrado' })
            return
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const { name, email, phone, address, cpf } = req.body

    if (!name) {
        res.status(422).json({ error: 'nome é obrigatório' })
        return
    }

    if (!email) {
        res.status(422).json({ error: 'email é obrigatório' })
        return
    }

    if (!phone) {
        res.status(422).json({ error: 'telefone é obrigatório' })
        return
    }

    if (!address) {
        res.status(422).json({ error: 'endereco é obrigatório' })
        return
    }

    if (!cpf) {
        res.status(422).json({ error: 'CPF é obrigatório' })
        return
    }

    const person = {
        name,
        email,
        phone,
        address,
        cpf
    }


    try {
        const updatePerson = await Person.updateOne({ _id: id }, person)

        if (updatePerson.matchedCount === 0) {
            res.status(422).json({ error: 'Usuário não encontrado' })
            return
        }

        res.status(201).json({ message: 'pessoa atualizada no sistema com sucesso!', person })

    } catch (error) {
        res.status(500).json({ error: error })
    }
})



router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const person = await Person.findOne({ _id: id })

    if (!person) {
        res.status(422).json({ error: 'Usuário não encontrado' })
        return
    }
    try {
        await Person.deleteOne({ _id: id })

        res.status(200).json({ message: "Usuário removido com sucesso" })

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = router; 