const
  through = require('through2')
, split   = require('split2')
, sprintf = require('sprintf')
, quote   = require('quote-stream')
, combine = require('stream-combiner2')

const a = file => {
  if (!/\.txt$/.test(file)) {
    return through()
  }
  let num = 0
  const lr = through((b, e, n) => {
    const l = b.toString('utf8') + '\n'
    if (num % 5 === 0) {
      this.push(sprintf('%3d %s', num, l))
    } else {
      this.push(`    ${l}`)
      num++
      n()
    }
  })
  const p = through()
  p.push('module.exports = ')
  return combine([split(), lr, quote(), p])
}
