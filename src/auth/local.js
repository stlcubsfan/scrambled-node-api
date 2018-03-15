const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

const localConfig = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}
passport.use('local-signup', new LocalStrategy(
  localConfig, 
  function(req, email, password, done) {
    if (email) {
      email = email.toLowerCase()
    }
    process.nextTick(function() {
      if (!req.user) {
        User.findOne({'local.email': email})
          .then((user) => {
            if (user) {
              return done(null, false)
            } else {
              let newUser = new User()
              newUser.local.email = email
              newUser.local.password = newUser.generateHash(password)
              newUser.local.firstName = req.body.firstName
              newUser.local.lastName = req.body.lastName
              newUser.save(function(err) {
                if (err) 
                  return done(err)

                return done(null, newUser)
              })
            }
          })
          .catch((err) => { return done(err) })
      } else {
        return done(null, req.user)
      }
    })
  }))

passport.use('local-login', new LocalStrategy(
  localConfig,
  function(req, email, password, done) {
    if (email) 
      email = email.toLowerCase()
    
    User.findOne({'local.email': email})
      .then(function (user) {
        if (!user) {
          return done(null, false)
        }
        if (!user.validPassword(password)) {
          return done(null, false)
        }
        else {
          return done(null, user)
        }
      }
    )
    .catch((err) => {
      return done(err)
    })
  }
))
