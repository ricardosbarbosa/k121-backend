require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

// middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))
app.use(cors({ credentials: true }))

// routers
const sorteioRouter = require('./sorteios/router')
app.use('/sorteios', sorteioRouter)

module.exports = app
