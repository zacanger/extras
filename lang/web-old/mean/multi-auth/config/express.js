'use strict'

const
  express        = require('express')
, session        = require('express-session')
, compression    = require('compression')
, morgan         = require('morgan')
, cookieParser   = require('cookie-parser')
, cookieSession  = require('cookie-session')
, bodyParser     = require('body-parser')
, methodOverride = require('method-override')
, csrf           = require('csurf')
, multer         = require('multer')
, swig           = require('swig')
, mongoStore     = require('connect-mongo')(session)
, flash          = require('connect-flash')
, winston        = require('winston')
, helpers        = require('view-helpers')
, config         = require('./config')
, pkg            = require('../package.json')
, env            = process.env.NODE_ENV || 'development'

module.exports = (app, passport) => {
  app
  .use(compression({threshold : 512}))
  .use(express.static(config.root + '/public'))

  let log = 'dev'
  if (env !== 'development') {
    log = {stream : {write : message => winston.info(message)}}
  }

  if (env !== 'test') {
    app.use(morgan(log))
  }

  if (env === 'development' || env === 'test') {
    swig.setDefaults({cache : false})
  }

  app
  .engine('html', swig.renderFile)
  .set('views', config.root + '/app/views')
  .set('view engine', 'html')

  .use((req, res, next) => {
    res.locals.pkg = pkg
    res.locals.env = env
    next()
  })

  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended : true}))
  .use(multer().array('image', 1))
  .use(methodOverride((req) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      let method = req.body._method
      delete req.body._method
      return method
    }
  }))

  .use(cookieParser())
  .use(cookieSession({secret : 'secret'}))
  .use(session({
    resave            : true
  , saveUninitialized : true
  , secret            : pkg.name
  , store             : new mongoStore({
      url        : config.db
    , collection : 'sessions'
    })
  }))

  .use(passport.initialize())
  .use(passport.session())
  .use(flash())
  .use(helpers(pkg.name))

  if (env !== 'test') {
    app
    .use(csrf())
    .use((req, res, next) => {
      res.locals.csrf_token = req.csrfToken()
      next()
    })
  }
}

