'use strict'

// npm i -S express express-session body-parser passport passport-local

const
  express       = require('express')
, bodyparser    = require('body-parser')
, app           = express()
, port          = process.env.PORT || 3000
, passport      = require('passport')
, Local         = require('passport-local').Strategy
, session       = require('express-session')

var users = [
  {
    'id'       : 101
  , 'username' : 'me'
  , 'password' : 'password'
  }
]

passport
.serializeUser((user, done) => done(null, users[0].id))
.deSerializeUser((id, done) => done(null, users[0]))
.use('local-login', new Local((username, password, done) => {
  if(username === users[0].username && password === users[0].password){
    return done(null, users[0])
  } else {
    return done(null, false, {'message' : 'user not found'})
  }
}))

app
.use(bodyparser.json())
.use(bodyparser.urlencoded({extended : true}))
.use(session({
  secret            : 'secret'
, resave            : true
, saveUninitialized : true
}))
.use(passport.initialize()) // this must come before the line below
.use(passport.session())

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()) {
    return next()
  }
  res.sendStatus(401)
}

app
.get('/', (req, res) => {res.send('howdy')})
.get('/login', (req, res) => {res.send(`
  <p>login!</p>
  <form method="post" action="/login">
    <input type="text" name="username">
    <input type="password" name="password">
    <button type="submit" value="submit">Submit</button>
  </form>`)})

.post('/login', passport.authenticate('local-login', {failureRedirect : '/login'}, (req, res) => res.redirect('/content')))
.get('/content', isLoggedIn, (req, res) => res.send('logged in!'))
.get('/logout', (req, res) => {
  req.logout()
  res.send('logged out!')
})
.listen(port)

console.log(`listening on ${port}`)

