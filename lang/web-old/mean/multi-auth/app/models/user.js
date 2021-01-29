'use strict'

const
  mongoose   = require('mongoose')
, crypto     = require('crypto')
, Schema     = mongoose.Schema
, oAuthTypes = ['github', 'twitter']
, UserSchema = new Schema({
  name            : {type : String, default : ''}
, email           : {type : String, default : ''}
, username        : {type : String, default : ''}
, provider        : {type : String, default : ''}
, hashed_password : {type : String, default : ''}
, salt            : {type : String, default : '' }
, authToken       : {type : String, default : ''}
, twitter         : {}
, github          : {}
})
, validatePresenceOf = value => value && value.length

UserSchema
.virtual('password')
.set(function (password) {
  this._password = password
  this.salt = this.makeSalt()
  this.hashed_password = this.encryptPassword(password)
})
.get(() => {
  return this._password
})

// local-only validations
UserSchema.path('name').validate((name) => {
  if (this.skipValidation()) {
    return true
  }
  return name.length
}, 'what is your name?')

UserSchema.path('email').validate((email) => {
  if (this.skipValidation()) {
    return true
  }
  return email.length
}, 'we need your email, please.')

UserSchema.path('email').validate((email, fn) => {
  const User = mongoose.model('User')
  if (this.skipValidation()) {
    fn(true)
  }

  // Check only when it is a new user or when email field is modified
  if (this.isNew || this.isModified('email')) {
    User.find({ email: email }).exec((err, users) => {
      fn(!err && users.length === 0)
    })
  } else fn(true)
}, 'already in our system!')

UserSchema.path('username').validate((username) => {
  if (this.skipValidation()) {
    return true
  }
  return username.length
}, 'need a username')

UserSchema.path('hashed_password').validate((hashed_password) => {
  if (this.skipValidation()) {
    return true
  }
  return hashed_password.length && this._password.length
}, 'a password is somewhat important')

UserSchema.pre('save', (next) => {
  if (!this.isNew) {
    return next()
  }

  if (!validatePresenceOf(this.password) && !this.skipValidation()) {
    next(new Error('Invalid password'))
  } else {
    next()
  }
})

UserSchema.methods = {
  authenticate (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },

  makeSalt () {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  },

  encryptPassword (password) {
    if (!password) {
      return ''
    }
    try {
      return crypto
      .createHmac('sha1', this.salt)
      .update(password)
      .digest('hex')
    } catch (err) {
      return ''
    }
  },

  skipValidation () {
    return ~oAuthTypes.indexOf(this.provider)
  }
}

UserSchema.statics = {
  load (options, cb) {
    options.select = options.select || 'name username'
    return this.findOne(options.criteria)
    .select(options.select)
    .exec(cb)
  }
}

mongoose.model('User', UserSchema)

