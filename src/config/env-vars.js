const convict = require('convict')

const config = convict({
  http: {
      port: {
        doc: 'Server Port',
        default: 3333,
        evn: 'PORT'
      }
  },
  database: {
    mongoUrl: {
      doc: 'MongoDB Url',
      default: 'mongodb://localhost:27017/test',
      evn: 'MONGODB_URL'
    }
  },
  authentication: {
    google: {
      clientId: {
        doc: "Client ID from Google",
        default: '',
        env: 'GOOGLE_CLIENT_ID'
      },
      clientSecret: {
        doc: "Client Secret from Google",
        default: '',
        env: 'GOOGLE_CLIENT_SECRET'
      },
      callbackUrl: {
        doc: 'Callback URL',
        default: '/api/authentication/google/start',
        env: 'GOOGLE_CALLBACK_URL'
      },
      redirectUrl: {
        doc: 'Callback URL',
        default: '/api/authentication/google/redirect',
        env: 'GOOGLE_REDIRECT_URL'        
      }

    },
    token: {
      secret: {
        doc: 'JWT Signing Key',
        default: 'supersecret',
        env: 'JWT_SIGNING_KEY'
      },
      issuer: {
        doc: 'Issuer of the JWT',
        default: 'scrambled',
        env: 'JWT_ISSUER'
      },
      audience: {
        doc: 'JWT Audience',
        default: 'scrambled',
        env: 'JWT_AUDIENCE'
      },
      expiresIn: {
        doc: 'Expiration time',
        default: '1 day',
        env: 'JWT_EXPIRES_IN'
      }
    }
  }
})

config.validate()

module.exports = config