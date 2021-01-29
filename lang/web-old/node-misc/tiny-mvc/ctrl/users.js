var mongoose = require('mongoose')
  , Model    = require('../mdl/user')

module.exports.controller = function(app){
  app.get('/register', function(req, res){
    res.render('users/register')
  })
  app.get('/login', function(req, res){
    res.render('users/login')
  })
}
