var mongoose = require('mongoose')
  , Schema   = mongoose.Schema

var userSchema = new Schema({
  username : String
, password : String
})

var User = mongoose.model('user', userSchema)

module.exports = User
