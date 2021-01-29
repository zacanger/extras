var express = require('express')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , mongodb = require('mongodb')
  , mongoose = require('mongoose')
  , bcrypt = require('bcrypt-nodejs')
  , SALT_WORK_FACTOR = 10
  , config = require('./config.json')
  , date = new Date()
  , year = date.getFullYear()

var title = config.site.title
if (config.site.copyright_from != year) {
  var by = '&copy; ' + config.site.copyright + ' ' + config.site.copyright_from + ' - ' + year
} else {
  var by = '&copy; ' + config.site.copyright + ' ' + config.site.copyright_from
}

if (config.db.use_url) {
  mongoose.connect(config.db.url)
} else {
  if (!config.db.auth) {
    if (config.db.port == null) {
      mongoose.connect('mongodb://' + config.db.host + '/' + config.db.db)
    } else {
      mongoose.connect('mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.db)
    }
  } else {
    if (config.db.port == null) {
      mongoose.connect('mongodb://' + config.db.username + '@' + config.db.password + config.db.host + '/' + config.db.db)
    } else {
      mongoose.connect('mongodb://' + config.db.username + '@' + config.db.password + config.db.host + ':' + config.db.port + '/' + config.db.db)
    }
  }
}

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function callback () {
  console.log('Connected to DB')
})

// User Schema
var userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  accessToken: { type: String } // Used for Remember Me
})

// Bcrypt middleware
userSchema.pre('save', function (next) {
  var user = this
  console.log(1)
  if (!user.isModified('password')) return next()

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err)
    console.log(2)

    bcrypt.hash(user.password, salt, function () {}, function callback (err, hash) {
      if (err) return next(err)
      user.password = hash
      console.log(3)
      next()
    })
  })
})

// Password verification
userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

// Remember Me implementation helper method
userSchema.methods.generateRandomToken = function () {
  var user = this,
    chars = '_!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
    token = new Date().getTime() + '_'
  for ( var x = 0; x < 16; x++) {
    var i = Math.floor(Math.random() * 62)
    token += chars.charAt(i)
  }
  return token
}

// Seed a user
var User = mongoose.model('User', userSchema)

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
//
//   Both serializer and deserializer edited for Remember Me functionality
passport.serializeUser(function (user, done) {
  var createAccessToken = function () {
    var token = user.generateRandomToken()
    User.findOne({ accessToken: token }, function (err, existingUser) {
      if (err) { return done(err); }
      if (existingUser) {
        createAccessToken(); // Run the function again - the token has to be unique!
      } else {
        user.set('accessToken', token)
        user.save(function (err) {
          if (err) return done(err)
          return done(null, user.get('accessToken'))
        })
      }
    })
  }

  if (user._id) {
    createAccessToken()
  }
})

passport.deserializeUser(function (token, done) {
  User.findOne({accessToken: token } , function (err, user) {
    done(err, user)
  })
})

// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(function (username, password, done) {
  User.findOne({ username: username }, function (err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
    user.comparePassword(password, function (err, isMatch) {
      if (err) return done(err)
      if (isMatch) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Invalid password' })
      }
    })
  })
}))

var app = express()

// configure Express
app.configure(function () {
  app.set('views', __dirname + '/views')
  app.set('view engine', 'ejs')
  app.engine('ejs', require('ejs-locals'))
  app.use(express.logger())
  app.use(express.cookieParser())
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(express.session({ secret: 'keyboard cat' })); // CHANGE THIS SECRET!
  // Remember Me middleware
  app.use(function (req, res, next) {
    if (req.method == 'POST' && req.url == '/login') {
      if (req.body.rememberme) {
        req.session.cookie.maxAge = 2592000000; // 30*24*60*60*1000 Rememeber 'me' for 30 days
      } else {
        req.session.cookie.expires = false
      }
    }
    next()
  })
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(app.router)
  app.use(express.static(__dirname + '/public'))
})

app.get('/', function (req, res) {
  res.render('index', { user: req.user, title: title, by: by })
})

app.get('/account', ensureAuthenticated, function (req, res) {
  res.render('account', { user: req.user, title: title, by: by })
})

app.get('/login', function (req, res) {
  res.render('login', { user: req.user, title: title, by: by, message: req.session.messages })
})

app.get('/register', function (req, res) {
  res.render('register', { user: req.user, title: title, by: by, message: req.session.messages, error: false })
})
app.get('/register/err', function (req, res) {
  res.render('register', { user: req.user, title: title, by: by, message: req.session.messages, error: true })
})

// POST /login
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
//
//   curl -v -d "username=bob&password=secret" http://127.0.0.1:3000/login
//
/***** This version has a problem with flash messages
app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  function(req, res) {
    res.redirect('/')
  })
*/

// POST /login
//   This is an alternative implementation that uses a custom callback to
//   acheive the same functionality.
app.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      req.session.messages = [info.message]
      return res.redirect('/login')
    }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      return res.redirect('/')
    })
  })(req, res, next)
})

app.post('/register', function (req, res) {
  var username = req.param('username')
  var password = req.param('password')
  var email = req.param('email')
  if (username == null || password == null || email == null) {
    res.redirect('/register/err')
  } else {
    var usr = new User({ username: username, email: email, password: password })
    usr.save(function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log('user: ' + usr.username + ' saved.')
      }
    })

    res.redirect('/login')
  }
})

app.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

app.listen(3000, function () {
  console.log('Express server listening on port 3000')
})

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}
