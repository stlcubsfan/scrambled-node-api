const environment = require('../config').environment
const token = require('./token')

const googleCallbackUrl = environment.get('authentication.google.callbackUrl')
const googleRedirectUrl = environment.get('authentication.google.redirectUrl')


function generateUserToken(req, res) {
    const accessToken = token.generateToken(req.user.id);
    res.json({success: true, token: 'JWT ' + accessToken})
}


module.exports = function (app, passport) {
  app.get(googleCallbackUrl, 
    passport.authenticate('google', {session: false, scope: ['openid', 'profile', 'email']}))

  app.get(googleRedirectUrl, 
    passport.authenticate('google', {
        session: false
    }), generateUserToken)
}