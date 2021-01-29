const r = require('request')
const p = r.post('http://0.0.0.0:8099')
process.stdin.pipe(p).pipe(process.stdout)
