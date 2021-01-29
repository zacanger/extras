'use strict'

const
  http = require('http')
, buff = require('bl')

let
  rslt = []
, cnt  = 0

function showR(){
  for (let i = 0; i < 3; i++) {
    console.log(rslt[i])
  }
}

function hg(ndx){
  http.get(process.argv[2 + ndx], res => {
    res.pipe(buff((err, data) => {
      if (err) {
        console.trace(err)
      }
      rslt[ndx] = data.toString()
      cnt++

        if (cnt === 3) {
          showR()
        }
    }))
  })
}

for (let i = 0; i < 3; i++) {
  hg(i)
}

