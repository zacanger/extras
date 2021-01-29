'use strict'

module.exports = {
  db      : 'mongodb://127.0.0.1/asdf_test'
, twitter : {
    clientID     : process.env.TWITTER_CLIENTID
  , clientSecret : process.env.TWITTER_SECRET
  , callbackURL  : 'http://127.0.0.1:3000/auth/twitter/callback'
  }
, github  : {
    clientID     : process.env.GITHUB_CLIENTID
  , clientSecret : process.env.GITHUB_SECRET
  , callbackURL  : 'http://127.0.0.1:3000/auth/github/callback'
  }
}

