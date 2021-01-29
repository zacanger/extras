'use strict'

// an express example using passport facebook auth.
// don't put this all in one file irl.
// npm i -S express express-session passport passport-facebook

const
  express      = require('express')
, app          = express()
, passport     = require('passport')
, Facebook     = require('passport-facebook').Strategy
, session      = require('express-session')
, port         = process.env.PORT || 3000
, facebookAuth = {
  'clientID'     : '9876543210' // facebook app id
, 'clientSecret' : 'asdfghjkl;' // facebook app secret
, 'callbackURL'  : 'http://localhost:3000/auth/facebook/callback'
}

// here are some users. obviously these would be pulled from a db or something.
var users = [
  {
    'id'       : 101
  , 'username' : 'zac'
  , 'password' : 'password'
  }
, {
    'id'    : 202
  , 'email' : 'someone@something.whatever'
  , 'name'  : 'you'
  , 'token' : 'lsadkjfalj48l4ajk'
  }
]

function findUser(id){
  for(let i = 0; i < users.length; i++){
    if(id === users[i].id){
      return users[i]
    }
  }
  return null
}

passport
.serializeUser((user, done) => {
  done(null, users[0].id)
})
.deSerializeUser((id, done) => {
  done(null, users[0])
})
.use(new Facebook({
  'clientID'     : facebookAuth.clientID
, 'clientSecret' : facebookAuth.clientSecret
, 'callbackURL'  : facebookAuth.callbackURL
}, (token, refreshToken, profile, done) => {
  var user = findUser(profile.id)
  if(user){
    console.log(users)
    return done(null, user)
  } else {
    var newUser = {
      'id'    : profile.id
    , 'name'  : profile.name.givenName + ' ' + profile.name.familyName
    , 'email' : (profile.emails[0].value || '').toLowerCase()
    , 'token' : token
    }
    users.push(newUser)
    console.log(users)
    return done(null, newUser)
  }
}))

app
.use(session({
  secret            : 'secret'
, resave            : true
, saveUninitialized : true
}))
.use(passport.initialize()) // this must be before .use(passport.session())
.use(passport.session())

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  res.sendStatus(401)
}

app
.get('/', (req, res) => {res.send('home')})
.get('/login', (req, res) => {res.send('a href="/auth.facebook">login</a>')})
.get('/auth/facebook', passport.authenticate('facebook', {scope : 'email'}))
.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect : '/content'
, failureRedirect : '/'
}))
.get('/content', isLoggedIn, (req, res) => {res.send('logged in!')})
.get('/logout', (req, res) => {
  req.logout()
  res.send('logged out!')
})
.listen(port)

console.log('serving on ' + port)
console.log(users)
