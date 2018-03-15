const mongoose = require('mongoose')
const Schema = mongoose.Schema

    const UserSchema = new Schema({
        local: {
            name: String,
            email: String,
            password: String
        },
        google: {
            id: String,
            email: String,
            name: String
        }
    })
    
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
        console.log(userDoc)
        const user = new mongoose.model('User', UserSchema)
        user[source] = userDoc
        user.save(function (err) {
            return user
        })
    }
    

    
        
    module.exports = mongoose.model('User', UserSchema)

