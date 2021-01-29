// use case:
// you have subdomains like foo.example.com, bar.example.com
// and need to redirect them to entirely other sites

const { createServer } = require('http')

const config = {
  'foo': 'https://foo.com',
  'bar': 'https://bar.com',
}

const port = process.env.PORT || 8000

const getName = (req) => {
  try {
    return (req.headers.host || req.headers.Host).split('.')[0]
  } catch (_) {
    return ''
  }
}

createServer((req, res) => {
  const name = getName(req)
  const location = config[name] || 'https://example.com'
  res.writeHead(301, { location })
  res.end()
}).listen(port, () => {
  console.log(`listening on ${port}`)
})
