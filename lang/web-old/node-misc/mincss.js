#!/usr/bin/env node

var querystring = require('querystring')
  , http        = require('http')
  , query       = querystring.stringify({input : css})
  , css         = process.argv[2]

var req = http.request({
  method   : 'POST'
, hostname : 'cssminifier.com'
, path     : '/raw'
},

function(resp) {
  if ( resp.statusCode !== 200 ) {
    console.log('StatusCode=' + resp.statusCode)
    return
  }
  resp.pipe(process.stdout)
})

req.on('error', function(err) {
  throw err
})

req.setHeader('Content-Type', 'application/x-www-form-urlencoded')
req.setHeader('Content-Length', query.length)
req.end(query, 'utf8')

