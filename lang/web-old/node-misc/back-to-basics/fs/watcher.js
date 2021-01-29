'use strict'

const fs = require('fs')
fs.watch('target.txt', () => {
  console.log('file \'target.txt\' modified')
})
console.log('watching target file for changes')

