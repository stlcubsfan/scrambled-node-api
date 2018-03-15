const passport = require('passport')
const google = require('passport-google-oauth')
const mongoose = require('mongoose')
const config = require('../config')
const User = require('../models/user')


const options = {
  clientID: config.environment.get('authentication.google.clientId'),
  clientSecret: config.environment.get('authentication.google.clientSecret'),
  callbackURL: config.environment.get('authentication.google.redirectUrl')
}

if (options.clientID) {
  passport.use(new google.OAuth2Strategy(options, function (req, accessToken, refreshToken, profile, done) {
    const fieldName = 'google.id'
    User.findOne({'google.id': profile.id}).then (function (user) {
      if (!user) {
        const userDoc = {
          id: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName       
        }
        const user = new User()
        user['google'] = userDoc
        user.save(function (err) {
          return done(null, user)
        })
      } else {
        return done(null, user)      
      }
    })
  }))
}
