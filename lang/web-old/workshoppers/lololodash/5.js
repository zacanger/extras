const _ = require('lodash')

const wordMod = arr =>
  _.chain(arr)
  .map(i => i + 'Chained')
  .map(i => i.toUpperCase())
  .sortBy()
  .value()

module.exports = wordMod
