const jwt = require('jsonwebtoken')
const config = require('../config')

function generateToken(userId) {
	const secret = config.environment.get('authentication.token.secret')
	const token = jwt.sign({}, secret, {
		expiresIn: config.environment.get('authentication.token.expiresIn'),
		audience: config.environment.get('authentication.token.audience'),
		issuer: config.environment.get('authentication.token.issuer'),
		subject: userId.toString()
	})

	return token
}

 module.exports = {
	 generateToken: generateToken
 }