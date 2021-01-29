const
  mongoose   = require('mongoose')
, crypto     = require('crypto')
, jwt        = require('jsonwebtoken')
, UserSchema = new mongoose.Schema({
    username : {type : String, lowercase : true, unique: true}
  , hash     : String
  , salt     : String
})

// crypto is a native node module
// pbkdf2() is built in
// pbkdf2Sync() takes four params: password, salt, iterations, key length

UserSchema.methods.setPassword = password => {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex')
}

UserSchema.methods.validPassword = password => {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex') // this has to match ^^ that
  return this.hash === hash
}

UserSchema.methods.generateJWT = () => {
  let
    today = new Date()
  , exp   = new Date(today)
  exp.setDate(today.getDate() + 90)

  return jwt.sign({
    _id      : this._id
  , username : this.username
  , exp      : parseInt(exp.getTime() / 1000)
  }, SECRET)
}

mongoose.model('User', UserSchema)

