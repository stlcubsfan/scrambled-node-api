const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const passport = require('passport')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

const config = require('./config')
mongoose.connect(config.environment.get('database.mongoUrl'));

require('./auth/jwt')
require('./auth/google')
require('./auth/local')

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(passport.initialize())
app.get('/', (req, res) => res.json({message: "Hello World"}))
require('./auth/routes.js')(app, passport)

const port = config.environment.get('http.port')
app.listen(port, () => console.log(`API Running on ${port}`))


