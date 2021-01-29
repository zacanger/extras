const { readFileSync } = require('fs')
const { resolve } = require('path')

module.exports = readFileSync(resolve(__dirname, 'input'))
  .toString()
  .split('\n')
  .filter((a) => a)
  .map((a) => a.replace(/\t/g, ' '))
  .map((a) => a.split(' ') .map((v) => parseInt(v, 10)))
  .map((r) => {
    const s = r.sort((a, b) => a - b)
    return s[s.length -1] - s[0]
  })
  .reduce((a, b) => a + b, 0)
