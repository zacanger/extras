const t = require('through2')

const tr = t(function(b, e, n) {
  this.push(b.toString().toUpperCase())
  n()
})

process.stdin.pipe(tr).pipe(process.stdout)
