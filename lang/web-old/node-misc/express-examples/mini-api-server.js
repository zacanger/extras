// tiniest little api server
// just needs express and body-parser

var express    = require('express')
  , bodyparser = require('body-parser')
  , items      = ['this thing', 'that thing', 'the other thing', '\'sup?']
  , app        = express()
  , port       = 9999

app.use(bodyparser.json())

app.get('/books', function(req, res, next) {
  console.log(req.body)
  res.send(books)
})

app.post('/books', function(req, res, next) {
  books.push(req.body.name);
  console.log(req.body);
  res.send(books);
});

app.put('/books', function(req, res, next) {
  var newPosition = req.body.position
  books[newPosition] = req.body.newName
  res.send(books)
})

app.delete('/books/:id', function(req, res, next) {
  console.log(req.params)
  books.splice(req.params.id, 1)
  res.send(books)
})

app.listen(port, function() {
  console.log('listening on,' port)
})
