#!/usr/bin/env node

'use strict'

const
  fs   = require('fs')
, path = require('path')
, http = require('http')

if(!process.argv[2] || !process.argv[3]){
  console.error('please specify url and desired filename')
  console.log('usage: ./downloader.js protocol://domain.tld/et/cetera ./path/file-to-save.extension')
} else {
  let
    file = path.join(__dirname, process.argv.slice(2)[1])
  , url  = process.argv.slice(2)[0]
  http.get(url, (response) => {
    response.pipe(fs.createWriteStream(file))
  })
}

