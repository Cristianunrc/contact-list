const express = require('express')
const morgan = require('morgan')
const path = require('path')

const app = express()

// middleware
app.use(morgan('dev'))

// Send request HTTP
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(require('./routes/index'))

app.use(express.static(path.join(__dirname, 'public')))

module.exports = app