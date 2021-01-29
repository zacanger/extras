var express = require('express'),
  morgan = require('morgan'),
  cookies = require('cookie-parser'),
  bodyparser = require('body-parser'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  flash = require('connect-flash'),
  session = require('express-session'),
  dbconf = require('./config/db.js'),
  app = express(),
  port = process.env.PORT || 9999

mongoose.connect(dbconf.url)

require('./config/passport')(passport)

app.use(morgan('dev'))
app.use(cookies())
app.use(bodyparser())
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.set('view engine', 'ejs')

require('./app/routes.js')(app, passport)

app.listen(port)
console.log('yurp, check ' + port + '.')
