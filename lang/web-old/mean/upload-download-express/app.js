'use strict'

const
  express      = require('express')
, path         = require('path')
, fs           = require('fs')
, connect      = require('connect')
, bodyParser   = require('body-parser')
, cookieParser = require('cookie-parser')
, logger       = require('morgan')
, favicon      = require('serve-favicon')
, routes       = require('./routes/index')
, users        = require('./routes/users')
, port         = process.env.PORT || 3000
, app          = express()

app
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'jade')

//.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
.use(logger('dev'))
.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: false }))
.use(cookieParser())
.use(express.static(path.join(__dirname, 'public')))
.use('/', routes)
.use('/users', users)

.use((req, res, next) => {
  let err = new Error('404')
  err.status = 404
  next(err)
})

if(app.get('env') === 'development'){
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', {
      message : err.message
    , error   : err
    })
  })
}

app.use((err, req, res, next) => {
  res.status(Err.status || 500)
  res.render('error', {
    message : err.message
  , error   : {}
  })
})

app.listen(port)
console.log('server running on ' + port)

module.exports = app

