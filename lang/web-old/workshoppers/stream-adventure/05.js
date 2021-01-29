const t = require('through2')
const s = require('split')

let lc = 0

const tr = t(function(b, e, n) {
  const l = b.toString()
  this.push(lc % 2 === 0 ? l.toLowerCase() + '\n' : l.toUpperCase() + '\n')
  lc++
  n()
})

process.stdin.pipe(s()).pipe(tr).pipe(process.stdout)
