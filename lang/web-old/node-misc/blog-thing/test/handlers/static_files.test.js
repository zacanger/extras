const
  test             = require('tape')
, Shot             = require('shot')
, serveStaticFiles = require('../../handlers.js').serveStaticFiles

test('/ serves up index.html', t => {
  const options = {
    method : 'GET'
  , url    : '/'
  }

  Shot.inject(serveStaticFiles, options, res => {
    t.equal(res.statusCode, 200, 'okay')
    t.equal(res.headers['Content-Type'], 'text/html', 'html')
    t.ok(res.payload.indexOf('Node') > -1, 'Correct Header Text')
    t.end()
  })
})

test('main.css is accessible by /main.css', t => {
  const options = {
    method : 'GET'
  , url    : '/main.css'
  }

  Shot.inject(serveStaticFiles, options, res => {
    t.equal(res.statusCode, 200, 'exists')
    t.equal(res.headers['Content-Type'], 'text/css', 'css')
    t.end()
  })
})

