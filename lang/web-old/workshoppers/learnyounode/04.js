'use strict'

const
  fs = require('fs')
, ag = process.argv[2]

fs.readFile(ag, (err, stuff) => {
  let nls = stuff.toString().split('\n').length - 1
  console.log(nls)
})

