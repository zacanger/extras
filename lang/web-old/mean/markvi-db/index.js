var express        = require('express')
  , mongoose       = require('mongoose')
  , bodyparser     = require("body-parser")
  , passport       = require("passport")
  , cookieparser   = require('cookie-parser')
  , methodoverride = require('method-override')
  , cors           = require('cors')
  , app            = express()

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
  envConfig = require('./server/env')[env]

mongoose.connect(envConfig.db)

require('./server/passport')(passport)

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))
app.use(cors())
app.use(methodoverride())
app.use(cookieparser())
app.use(express.static(__dirname + '/public'))
app.use(require('express-session')({
  secret: 'asdfjkl',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(__dirname + '/client'))

require('./server/routes')(app, passport)

app.listen(envConfig.port, function(){
  console.log('listening on ' + envConfig.port)
})

