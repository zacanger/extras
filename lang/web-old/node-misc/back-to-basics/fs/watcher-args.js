'use strict'

const
  fs       = require('fs')
, filename = process.argv[2]

if(!filename){
  throw Error('must specify file!')
}
fs.watch(filename, () => {
  console.log(filename, 'changed')
})
console.log('watching', filename, 'for changes')

