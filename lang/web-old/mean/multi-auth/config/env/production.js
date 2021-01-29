'use strict'

module.exports = {
  db      : process.env.MONGOHQ_URL
, twitter : {
    clientID     : process.env.TWITTER_CLIENTID
  , clientSecret : process.env.TWITTER_SECRET
  }
, github  : {
    clientID     : process.env.GITHUB_CLIENTID
  , clientSecret : process.env.GITHUB_SECRET
  }
}

