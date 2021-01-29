const
  mongoose  = require('mongoose')
, PasLocMon = require('passport-local-mongoose')
, User      = new mongoose.Schema({
    email: {type: String, required: true}
}, {strict: true})

User.plugin(PasLocMon, {usernameField : 'email'})

module.exports = mongoose.model('User', User)

