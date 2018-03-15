const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  local: {
    firstName: String,
    lastName: String,
    email: String,
    password: String
  },
  google: {
    id: String,
    email: String,
    name: String
  }
})
  
UserSchema.methods.generateHash = function (pass) {
  return bcrypt.hashSync(pass, bcrypt.genSaltSync(12), null)
}

UserSchema.methods.validPassword = function (pass) {
  return bcrypt.compareSync(pass, this.local.password)
}

UserSchema.statics.getByExternalId = function (source, profileId) {
  const fieldName = `${source}.id`
  return this.find({fieldName: profileId})
}

UserSchema.statics.createUserFromProfile = function (source, id, email, name) {
  const userDoc = {
    id: id,
    email: email,
    name: name       
  }    
  
  const user = new mongoose.model('User', UserSchema)
  user[source] = userDoc
  user.save(function (err) {
      return user
  })
}
   
module.exports = mongoose.model('User', UserSchema)

