'use strict'

const
  path        = require('path')
, extend      = require('util')._extend
, development = require('./env/development')
, test        = require('./env/test')
, production  = require('./env/production')
, notifier = {
  service : 'postmark'
, APN     : false
, email   : true
, actions : ['comment']
, tplPath : path.join(__dirname, '..', 'app/mailer/templates')
, key     : 'POSTMARK_KEY'
}

, defaults = {
  root     : path.join(__dirname, '..')
, notifier : notifier
}

module.exports = {
  development : extend(development, defaults)
, test        : extend(test, defaults)
, production  : extend(production, defaults)
}[process.env.NODE_ENV || 'development']

