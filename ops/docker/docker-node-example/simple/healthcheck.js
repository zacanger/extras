const request = require('http').request({
  host: 'localhost',
  port: process.env.PORT || 9999,
  timeout: 1000
}, (res) => {
  process.exit(res.statusCode === 200 ? 0 : 1)
})

request.on('error', () => {
  process.exit(1)
})

request.end()
