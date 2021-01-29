'use strict'

const
  fs    = require('fs')
, stuff = fs.readFileSync(process.argv[2])
, nls   = stuff.toString().split('\n').length - 1

console.log(nls)

