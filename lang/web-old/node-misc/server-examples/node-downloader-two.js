'use strict'

const
  fs   = require('fs')
, http = require('http')

function download(url, dest, cb){
  let
    file = fs.createWriteStream(dest)
    , req  = http.get(url, (res) => {
    res.pipe(file)
    file.on('finish', () => {
      file.close(cb) // close() is async; call cb after close completes.
    })
  }).on('error', (err) => {
    fs.unlink(dest) // delete file async (not checking result).
    if(cb){
      cb(err.message)
    }
  })
}

