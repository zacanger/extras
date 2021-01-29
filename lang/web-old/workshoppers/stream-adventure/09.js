const ws = require('websocket-stream')
const s = ws('ws://localhost:8099')
s.write('hello\n')
