'use strict'

const
  express    = require('express')
, session    = require('express-session')
, bodyParser = require('body-parser')
, urlenc     = bodyParser.urlencoded({extended : false})
, app        = express()
, port       = 10000

app

.use(session({secret : 'secret'}))

.use((req, res, next) => {
  if(typeof(req.session.todolist) == 'undefined'){
    req.session.todolist = []
  }
  next()
})

.get('/todo', (req, res) => {
  res.render('todo.ejs', {todolist : req.session.todolist})
})

.post('/todo/add', urlenc, (req, res) => {
  if(req.body.newtodo != ''){
    req.session.todolist.push(req.body.newtodo)
  }
  res.redirect('/todo')
})

.get('/todo/delete/:id', (req, res) => {
  if(req.params.id != ''){
    req.session.todolist.splice(req.params.id, 1)
  }
  res.redirect('/todo')
})

.use((req, res, next) => {
  res.redirect('/todo')
})

.listen(port)

