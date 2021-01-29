const
  express      = require('express')
, path         = require('path')
, favicon      = require('serve-favicon')
, logger       = require('morgan')
, cookieparser = require('cookie-parser')
, bodyparser   = require('body-parser')
, passport     = require('passport')
, mongoose     = require('mongoose')
, posts        = require('./models/posts')
, comments     = require('./models/comments')
, passportconf = require('./config/passport')
, mongo        = 'mongodb://127.0.0.1:27017/news'
, routes       = require('./routes/index')
, users        = require('./routes/users')
, app          = express()

mongoose.connect(mongo)

// view engine setup
app
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')

.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
.use(logger('dev'))
.use(bodyparser.json())
.use(bodyparser.urlencoded({extended : false}))
.use(cookieparser())
.use(express.static(path.join(__dirname, 'public')))
.use(passport.initialize())
.use('/', routes)
.use('/users', users)
.use((req, res, next) => {
  var err = new Error('For oh four O! For oh, 4...')
  err.status = 404
  next(err)
})

if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', {
      message : err.message
    , error   : err
    })
  })
}

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message : err.message
  , error   : {}
  })
})

module.exports = app

