'use strict'

const
  fs     = require('fs')
, stream = fs.createReadStream(process.argv[2])

stream.on('data', (chunk) => {
  process.stdout.write(chunk)
})
stream.on('error', (err) => {
  process.stderr.write('ERROR', err.message, '\n')
})

