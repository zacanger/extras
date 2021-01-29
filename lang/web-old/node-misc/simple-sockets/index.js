const
  WebSocketServer = require('ws').Server
, wsServer        = new WebSocketServer({port : 3000})

wsServer.on('connection', ws => {
  console.log('connected')
  ws.send('connected')
  ws.on('message', msg => {
    ws.send('message received')
    console.log('received: ' + msg)
  })
})
