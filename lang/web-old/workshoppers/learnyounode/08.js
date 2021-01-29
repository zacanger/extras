'use strict'

const
  http = require('http')
, buff = require('bl')
, arg  = process.argv[2]

http.get(arg, res => {
  res.pipe(buff((err, data) => {
    if (err) {
      console.trace(err)
    }
    data = data.toString()
    console.log(data.length)
    console.log(data)
  }))
})

