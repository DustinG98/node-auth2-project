const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const protectedRoute = require('./auth/protected-middleware')


const server = express()

const authRouter = require('./auth/auth-router')
const userRouter = require('./users/user-router')

server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/auth', authRouter)
server.use('/api/users', protectedRoute ,userRouter)

require('dotenv').config()

server.get('/', (req, res) => {
    res.json({ message: "Server is connected." })
})


module.exports = server;