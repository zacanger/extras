'use strict'

const
  fs      = require('fs')
, envFile = require('path').join(__dirname, 'env.json')

let env = {}

if (fs.existsSync(envFile)) {
  env = fs.readFileSync(envFile, 'utf-8')
  env = JSON.parse(env)
  Object.keys(env).forEach(key => process.env[key] = env[key])
}

module.exports = {
  db      : 'mongodb://127.0.0.1:27017/multiauth?replicaSet=rs0'
, twitter : {
    clientID     : process.env.TWITTER_CLIENTID
  , clientSecret : process.env.TWITTER_SECRET
  , callbackURL  : 'http://127.0.0.1:3000/auth/twitter/callback'
  }
, github  : {
    clientID     : process.env.GITHUB_CLIENTID
  , clientSecret : process.env.GITHUB_SECRET
  , callbackURL : 'http://127.0.0.1:3000/auth/github/callback'
  }
}

