const dup = require('duplexer2')
const { obj } = require('through2')

const thingy = c => {
  const cs = {}
  const write = (r, a, n) => {
    cs[r.country] = (cs[r.country] || 0) + 1
    n()
  }
  const end = a => {
    c.setCounts(cs)
    a()
  }
  const inp = obj(write, end)
}

module.exports = thingy
