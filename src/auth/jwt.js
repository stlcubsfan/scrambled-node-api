const passport = require('passport')
const passportJwt = require('passport-jwt')
const config = require('../config')
const User = require('../models/user')

const options = {
  audience: config.environment.get('authentication.token.audience'),
  issuer: config.environment.get('authentication.token.issuer'),
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: config.environment.get('authentication.token.secret'),
}

passport.use(new passportJwt.Strategy(options, (payload, done) => {
  User.findById(payload.sub, function (err, user) {
    if (err) {
      console.log(err)
    }
    if (user) {
      return done(null, user, payload)
    }
    return done()
  })
}))