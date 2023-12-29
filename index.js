const express = require('express')
const app = express()

app.use(express.static('./public'))

const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
// const cors = require('cors')
// app.use(cors())

app.use(express.json())

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://admin:admin12345@cluster0.bc3ww2b.mongodb.net/jwtlogin?retryWrites=true&w=majority').then(() => console.log('mongodb connected...')).catch((err) => console.log(err))


app.post('/api/register', async (req, res) => {
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.status(200).json({ status: 'ok' })
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ status: 'error', error: 'Internal Server Error', });
    }
});

app.post('/api/login', async (req, res) => {

    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    if (user) {
        const token = jwt.sign({
            name: user.name,
            email: user.email
        }, 'secretkey12345')

        return res.json({ status: 'ok', user: token })


    } else {
        return res.json({ status: 'error', error: 'Dublicate email' })

    }

})

app.get('/api/quote', async (req, res) => {

    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, 'secretkey12345')
        const email = decoded.email
        const user = await User.findOne({ email: email })
        return res.json({ status: 'ok', email: user.email, quote: user.quote })
    } catch (error) {
        res.json({ status: 'error', err: 'invalied token' })
    }

})

app.post('/api/quote', async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secretkey12345')
        const email = decoded.email
        await User.updateOne(
            { email: email },
            { $set: { quote: req.body.quote } }
        )

        return res.json({ status: 'ok' })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }
})


app.listen(3000, () => console.log('server is running...'))