var User = require('./models/user'),
  LocalStrategy = require('passport-local').Strategy

module.exports = function(passport){
  passport.use(User.createStrategy())
  passport.serializeUser(User.serializeUser())
  passport.deserializeUser(User.deserializeUser())
}
