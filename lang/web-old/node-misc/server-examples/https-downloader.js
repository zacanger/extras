'use strict'

const
  https   = require('https')
, fs      = require('fs')
, getIt   = process.argv[2]
, saveAs  = process.argv[3]
, fileIt  = fs.createWriteStream(saveAs)
, options = {
  hostname  : getIt.split('/')[0]
, port      : 443
, path      : getIt.split('/').splice(1).join('')
, method    : 'GET'
}

const req = https.request(options, (res) => {
  console.log("statusCode: ", res.statusCode)
  console.log("headers: ", res.headers)
  res.on('data', (d) => {
    fileIt.write(d)
  })
})

req.end()

req.on('error', (e) => {
  console.error(e)
})

