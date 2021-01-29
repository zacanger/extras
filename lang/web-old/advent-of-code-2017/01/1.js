const { readFileSync } = require('fs')
const { resolve } = require('path')

module.exports = readFileSync(resolve(__dirname, 'input'))
  .toString()
  .split('\n')[0]
  .split('')
  .map((i) => parseInt(i, 10))
  .reduce((prev, curr, idx, nums) =>
    curr === nums[(idx + 1) % nums.length]
      ? prev + curr
      : prev, 0)
