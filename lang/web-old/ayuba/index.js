const
  express        = require('express')
, mongoose       = require('mongoose')
, bodyParser     = require('body-parser')
, passport       = require('passport')
, cookieParser   = require('cookie-parser')
, methodOverride = require('method-override')
, cors           = require('cors')
, app            = express()
, env            = process.env.NODE_ENV = process.env.NODE_ENV || 'development'
, envConfig      = require('./server/env')[env]

mongoose.connect(envConfig.db)

require('./server/passport')(passport)

app
.use(bodyParser.json())
.use(bodyParser.urlencoded({extended : false}))
.use(cors())
.use(methodOverride())
.use(cookieParser())
.set('view engine', 'ejs')
.use(require('express-session')({
, resave            : false,
, saveUninitialized : false
}))
.use(passport.initialize()) // these two lines must go in this order
.use(passport.session())
.use(express.static(__dirname + '/public'))

require('./server/routes')(app, passport)

app.listen(envConfig.port, () => console.log(`running on ${envConfig.port}`))

