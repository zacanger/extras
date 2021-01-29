// run with, for example, `ENTRY_POINT=a webpack`

const path = require('path')

var ENTRY_POINT = JSON.stringify(JSON.parse(process.env.ENTRY_POINT || 'false'))

var entry = {}

if (ENTRY_POINT === 'a') {
  entry.a = './a'
} else if (ENTRY_POINT === 'b') {
  entry.b = './b'
} else if (ENTRY_POINT === 'c') {
  entry.a = ['./c', './d']
}

module.exports = {
  entry : entry
, output : {
    path     : path.join(__dirname, 'dist')
  , filename : '[name].entry.js'
  }
}


// or (if we're not running webpack with any other flags):
const entry = process.argv[2]
if (entry == 'a') {
  entry.a = './a'
}

