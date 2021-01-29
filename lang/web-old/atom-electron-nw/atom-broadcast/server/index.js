var server = require('http').createServer(),
  url = require('url'),
  WebSocketServer = require('ws').server,
  ws = new WebSocketServer({server: server}),
  express = require('express'),
  app = express(),
  port = 9999

app.use(function (req, res) {
  res.send({msg: 'foo'})
})

wss.on('connection', function connection (ws) {
  var location = url.parse(ws.upgradeReq.url, true)
  ws.on('message', function incoming (message) {
    console.log('received: %s', message)
  })
  ws.send('bar')
})

server.on('request', app)
server.listen(port, function () {
  console.log('listening on ' + server.address().port)
})
