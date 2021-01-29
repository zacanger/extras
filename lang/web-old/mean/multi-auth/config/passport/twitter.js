'use strict'

const
  mongoose        = require('mongoose')
, TwitterStrategy = require('passport-twitter').Strategy
, config          = require('../config')
, User            = mongoose.model('User')

module.exports = new TwitterStrategy({
  consumerKey    : config.twitter.clientID
, consumerSecret : config.twitter.clientSecret
, callbackURL    : config.twitter.callbackURL
}
, (accessToken, refreshToken, profile, done) => {
    const options = {criteria : {'twitter.id' : profile.id}}
    User.load(options, (err, user) => {
      if (err) {
        return done(err)
      }
      if (!user) {
        user = new User({
          name     : profile.displayName
        , username : profile.username
        , provider : 'twitter'
        , twitter  : profile._json
        })
        user.save(err => {
          if (err) {
            console.log(err)
          }
          return done(err, user)
        })
      } else {
        return done(err, user)
      }
    })
  }
)

