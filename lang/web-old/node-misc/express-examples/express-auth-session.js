// npm i -S express express-session

'use strict'

const
  express = require('express')
, session = require('express-session')
, app     = express()
, port    = process.argv[2] || process.env.PORT || 3000

// config
app.use(session({
  secret            : 'asdf' // ignore this line usually
, resave            : true
, saveUninitialized : true
}))
function auth(req, res, next){
  if(req.session && req.session.user === 'someUserWeKnowAboutAlready' && req.session.admin){
    return next()
  } else {
    return res.sendStatus(401)
  }
}

// endpoints
// obviously irl don't put username & password in a querystring
app.get('/login', (req, res) => {
  if(!req.query.username || !req.query.password){
    res.send('failed login')
  } else if(req.query.username === 'someUserWeKnowAboutAlready' || req.query.password === 'passwordForThatUser'){
    req.session.user  = 'someUserWeKnowAboutAlready'
    req.session.admin = true
    req.send('logged in')
  }
})
app.get('/logout', (req, res) => {
  req.session.destroy()
  res.send('logged out')
})
app.get('/content', auth, (req, res) => {
  res.send('yay, you\'ve logged in and can see this content now')
})

app.listen(port)
console.log('app running on ' + port)

