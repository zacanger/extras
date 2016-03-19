#!/usr/bin/env node

const
  fs       = require('fs')
, from     = process.argv[2]
, to       = process.argv[3]
, readFrom = fs.createReadStream(from)
, writeTo  = fs.createWriteStream(to)

console.log(from, '===>', to)

readFrom.on('data', (chunk) => {
  writeTo.write(chunk)
})
readFrom.on('end', () => {
  writeTo.end()
})
readFrom.on('error', (err) => {
  console.log('error!', err)
})
writeTo.on('error', (err) => {
  console.log('error!', err)
})
