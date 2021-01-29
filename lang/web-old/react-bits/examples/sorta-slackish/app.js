var express        = require('express')
  , bodyParser     = require('body-parser')
  , logger         = require('morgan')
  , methodOverride = require('method-override')
  , multer         = require('multer')
  , path           = require('path')
  , app            = express()
  , _              = require('underscore')
  , http           = require('http').createServer(app)
  , io             = require('socket.io').listen(http)
  , participants   = []
  , messages       = []


app.set('port', process.env.PORT || 3000)

app.use(logger('dev)'))
app.use(methodOverride())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(multer())
app.use(express.static(path.join(__dirname, 'public')))

if('development' == app.get('env')){
  app.use(express.errorHandler({dumpExceptions: true, showStack: true}))
}

function mostRecentMessages(){
  return messages.slice(messages.length-20, messages.length)
}

app.get('/messages', function(request, response){
  response.json(200, mostRecentMessages())
})

app.post('/messages', function(request, response){
  var text = request.body.text

  if(text && text.trim().length > 0){
    var user_id    = request.body.user_id
      , created_at = request.body.create_at
      , user       = _.findWhere(participants, {id: user_id})
      , message    = {text: text, user: user, type: 'message', created_at: created_at}

      messages.push(message)
      clientSockets[user.id].broadcast.emit('message:added', {message:message})
      response.json(200, {message:message})
  } else {
    return response.json(400, {errors: {text: 'sorry, no message'}})
  }
})

var nameCounter   = 1
  , clientSockets = []

io.on('connection', function(socket){
  socket.on('new_user', function(data){
    console.log('ON new_user', data)
    var newName = 'Guest ' + nameCounter++
    , user    = {id: data.id, name: newName, initials: 'ZA'}
    participants.push(user)
    clientSockets[data.id] = socket
    console.log('messages', messages, mostRecentMessages())
    io.sockets.emit('new_connection', {user: user, sender: 'system', created_at: new Date().toISOString()})
    io.sockets.emit('user:connected', {user:user, created_at: new Date().toISOString()})
  })
  socket.on('fetch', function(data){
    console.log('ON fetch', data)
    io.sockets.emit('fetch_result', mostRecentMessages())
  })
  socket.on('name_change', function(data){
    console.log('ON name_change', data)
  })
  socket.on('disconnect', function(){
    console.log('ON disconnect', socket.id)
    var participant = _.findWhere(participants, {id: socket.id})
    participants    = _.without(participants, participant)
    io.sockets.emit('user_disconnected', {user: participant, sender: 'system', created_at: new Date().toISOString()})
    io.sockets.emit('user:disconnected', {user: participant, created_at: new Date().toISOString()})
  })
})

http.listen(app.get('port', function(){
  console.log('express over at ' + app.get('port'))
}))
