const { spawn } = require('child_process')
const dup = require('duplexer2')

const thing = (c, a) => {
  const p = spawn(c, a)
  return dup(p.stdin, p.stdout)
}

module.exports = thing
