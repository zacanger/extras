'use strict'

const
  filt = require('./6-2')
, d    = process.argv[2]
, str  = process.argv[3]

filt(d, str, (err, list) => {
  if (err) {
    return console.trace('err:', err)
  }
  list.forEach(f => {
    console.log(f)
  })
})

