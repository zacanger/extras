var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');


var app = express();

var logger = function(req, res, next) {
  console.log('\n\n------------------------------\n------------------------------\n\n');
  console.log('\n___HEADERS___\n', req.headers);
  console.log('\n___BODY___\n', req.body);
  console.log('\n___SESSION___\n', req.session);
  next();
};

app.use(bodyParser.json());
app.use(session({
  secret: 'qwlwfjkpq3498vsda',
  saveUninitialized: true,
  resave: true
}));

app.post('/cart', function(req, res, next) {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  req.session.cart.push(req.body);
  next();
}, logger, function(req, res, next) {
  res.status(200).json(req.session.cart);
});

app.get('/cart', function(req, res, next) {
  res.status(200).json(req.session.cart);
});

app.listen(3000, function() {
  console.log('listening to port 3000');
});

