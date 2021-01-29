const { createServer } = require('http')
const t = require('through2')

createServer((req, res) => {
  if (req.method === 'POST') {
    req.pipe(t(function(b, e, n) {
      this.push(b.toString().toUpperCase())
      n()
    })).pipe(res)
  } else {
    res.end('send me a POST\n')
  }
}).listen(process.argv[2])
