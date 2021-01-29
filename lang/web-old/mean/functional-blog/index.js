const
  express        = require('express')
, mongoose       = require('mongoose')
, bodyParser     = require('body-parser')
, passport       = require('passport')
, cookieParser   = require('cookie-parser')
, methodOverride = require('method-override')
, cors           = require('cors')
, app            = express()

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'
, envConfig = require('./server/env')[env]

mongoose.connect(envConfig.db)

require('./server/passport')(passport)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(methodOverride())
app.use(cookieParser())
app.set('view engine', 'ejs')
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(__dirname + '/public'))

require('./server/routes')(app, passport)

app.listen(envConfig.port, function () {
  console.log('Server listening on port ' + envConfig.port)
})

