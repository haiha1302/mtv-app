const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const { OAuth2Client } = require('google-auth-library')

dotenv.config()

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const app = express()
app.use(express.json())
app.use(cors({}))

const users = []

const upsert = (array, item) => {
    const i = array.findIndex((_item) => _item.email === item.email)
    if (i > -1) array[i] = item
    else array.push(item)
}

app.post('/api/google-login', async (req, res) => {
    const { token } = req.body

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID 
    })

    const { name, email, picture } = ticket.getPayload()
    upsert(users, { name, email, picture })
    res.status(201).json({
        name,
        email,
        picture
    })
})

// deployment configuration

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../frontend/build/index.html')));
}

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.NODE_ENV} at port ${PORT} `);
})