const
  passport      = require('passport')
, LocalStrategy = require('passport-local').Strategy
, mongoose      = require('mongoose')
, User          = mongoose.model('User')

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({username : username}, (err, user) => {
    if (err) {
      return done(err)
    }
    if (!user) {
      return done(null, false, {message : 'nope!'})
    }
    if (!user.validPassport(password)) {
      return done(null, false, {message : 'good try, though.'})
    }
    return done(null, user)
  })
}))

