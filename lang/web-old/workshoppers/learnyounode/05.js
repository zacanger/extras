'use strict'

const
  fs   = require('fs')
, path = require('path')

fs.readdir(process.argv[2], (err, list) => {
  list.forEach(file => {
    if (path.extname(file) === '.' + process.argv[3]) {
      console.log(file)
    }
  })
})

