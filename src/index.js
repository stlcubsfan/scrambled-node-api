const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

const config = require('./config')
mongoose.connect(config.environment.get('database.mongoUrl'));

require('./auth/jwt')
require('./auth/google')

const app = express()
app.use(cors())
app.use(passport.initialize())
app.get('/', (req, res) => res.json({message: "Hello World"}))
require('./auth/routes.js')(app, passport)

const port = config.environment.get('http.port')
app.listen(port, () => console.log(`API Running on ${port}`))


