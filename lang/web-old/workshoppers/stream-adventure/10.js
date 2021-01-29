const tr = require('trumpet')
const th = require('through2')
const t = trumpet()
const l = t.select('.loud').createStream()
l.pipe(tr(function(b, e, n) {
  this.push(b.toString().toUpperCase)
  n()
})).pipe(l)

process.stdin.pipe(t).pipe(process.stdout)
