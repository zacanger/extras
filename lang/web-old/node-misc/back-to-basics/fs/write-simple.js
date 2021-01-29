'use strict'

const fs = require('fs')
fs.writeFile('target.txt', 'stuff\n', (err) => {
  if(err){
    throw err
  }
  console.log('saved')
})

