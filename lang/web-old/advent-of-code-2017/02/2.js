const { readFileSync } = require('fs')
const { resolve } = require('path')

const input = readFileSync(resolve(__dirname, 'input'))
  .toString()
  .split('\n')
  .filter((a) => a)
  .map((a) => a.replace(/\t/g, ' '))
  .map((a) => a.split(' ') .map((v) => parseInt(v, 10)))

let sum = 0
input.forEach((r) => {
  let d = 0
  r.forEach((divd, i1) => {
    r.forEach((divr, i2) => {
      if ((i1 !== i2) && (divd % divr === 0)) {
        d = divd / divr
      }
    })
  })
  sum += d
})

module.exports = sum
