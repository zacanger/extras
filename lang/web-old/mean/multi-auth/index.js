'use strict'

const
  fs       = require('fs')
, join     = require('path').join
, express  = require('express')
, mongoose = require('mongoose')
, passport = require('passport')
, config   = require('./config/config')
, models   = join(__dirname, 'app/models')
, port     = process.env.PORT || 3000
, app      = express()


fs.readdirSync(models)
.filter(file => ~file.indexOf('.js'))
.forEach(file => require(join(models, file)))

require('./config/passport')(passport)
require('./config/express')(app, passport)
require('./config/routes')(app, passport)

connect()
.on('error', console.log)
.on('disconnected', connect)
.once('open', listen)

function listen () {
  if (app.get('env') === 'test') {
    return
  }
  app.listen(port)
  console.log('check ' + port)
}

function connect () {
  let options = {server : {socketOptions : {keepAlive : 1}}}
  return mongoose.connect(config.db, options).connection
}

module.exports = app

