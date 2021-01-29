'use strict'

const
  http = require('http')
, fs   = require('fs')

function getIt(url, dest){
  let file = fs.createWriteStream(dest)
  return new Promise((resolve, reject) => {
    var responseSent = false // flag to make sure that response is sent only once.
    http.get(url, response => {
      response.pipe(file)
      file.on('finish', () =>{
        file.close(() => {
          if(responseSent)  return
          responseSent = true
          resolve()
        })
      })
    }).on('error', err => {
        if(responseSent){
          return
        }
        responseSent = true
        reject(err)
    })
  })
}

//example
getIt(url, fileLocation)
  .then(()=> console.log('downloaded file no issues...'))
  .catch(e => console.error('error while downloading', e))

