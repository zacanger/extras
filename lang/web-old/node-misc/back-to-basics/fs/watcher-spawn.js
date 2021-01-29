'use strict'

const
  fs       = require('fs')
, spawn    = require('child_process').spawn
, filename = process.argv[2]

if(!filename){
  throw Error('no filename!')
}

fs.watch(filename, () => {
  let ls = spawn('ls', ['-lhoa', filename])
  ls.stdout.pipe(process.stdout)
})

console.log('watching', filename, 'for changes')

