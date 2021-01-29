var mongoose  = require('mongoose')
  , PasLocMon = require('passport-local-mongoose')
  , ObjID     = mongoose.Types.ObjectId

var User = new mongoose.Schema({
    email: {type: String, required: true}
  , posts : [{type: ObjID, ref: 'Post'}]
}, {strict: true})

User.plugin(PasLocMon, {usernameField: 'email'})

module.exports = mongoose.model('User', User)
