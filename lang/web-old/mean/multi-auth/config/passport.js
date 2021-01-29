'use strict'

const
  mongoose = require('mongoose')
, User     = mongoose.model('User')
, local    = require('./passport/local')
, twitter  = require('./passport/twitter')
, github   = require('./passport/github')

module.exports = (passport) => {
  passport.serializeUser((user, cb) => cb(null, user.id))
  passport.deserializeUser((id, cb) => User.load({criteria : {_id : id}}, cb))
  passport.use(local)
  passport.use(twitter)
  passport.use(github)
}

