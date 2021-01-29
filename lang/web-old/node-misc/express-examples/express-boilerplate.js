var express    = require('express')
  , bodyparser = require('body-parser')
  , session    = require('express-session')
  , app        = express()
  , port       = 9999

var logger = function(req, res, next){
  console.log('\n\n')
  console.log('\nHEADERS\n', req.headers)
  console.log('\nBODY\n', req.body)
  console.log('\nSESSION\n', req.session)
  next()
}

app.use(bodyparser.json())
app.use(session({
  secret            : 'barFOO'
, saveUninitialized : true
, resave            : true
}))

app.post('/cart', function(req, res, next){
  if (!req.session.cart){
    req.session.cart = []
  }
  req.session.cart.push(req.body)
  next()
}, logger, function(req, res, next){
  res.status(200).json(req.session.cart)
})

app.get('/cart', function(req, res, next){
  res.status(200).json(req.session.cart)
})

app.listen(port, function(){
  console.log('doin it on ' + port)
})
