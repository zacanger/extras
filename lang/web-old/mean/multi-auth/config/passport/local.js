'use strict'

const
  mongoose      = require('mongoose')
, LocalStrategy = require('passport-local').Strategy
, User          = mongoose.model('User')

module.exports = new LocalStrategy({
  usernameField : 'email'
, passwordField : 'password'
}
, (email, password, done) => {
    const options = {
      criteria : {email : email}
    , select   : 'name username email hashed_password salt'
    }
    User.load(options, (err, user) => {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false, {message : 'Unknown user'})
      }
      if (!user.authenticate(password)) {
        return done(null, false, {message : 'Invalid password'})
      }
      return done(null, user)
    })
  }
)

