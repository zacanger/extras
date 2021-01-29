'use strict'

function greeting(req, res){
  let fn = req.query.name
  res.send('howdy ' + fn)
}

function add(req, res){
  let
    n1  = req.body.num1
  , n2  = req.body.num2
  , sum = parseInt(n1, 10) + parseInt(n2, 10)
  res.send(n1 + ' plus ' + n2 + ' is ' + sum)
}

function attachService(app){
  app.get('/greeting', greeting)
  app.post('/add', add)
}

exports.attachService = attachService

