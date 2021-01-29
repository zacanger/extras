'use strict'

const
  fs   = require('fs')
, path = require('path')

module.exports = (d, str, cb) => {
  fs.readdir(d, (err, list) => {
    if (err) {
      return cb(err)
    }
    list = list.filter(f => path.extname(f) === '.' + str)
  })
  cb(null, list)
}

