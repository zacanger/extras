const uniq = require('uniq')

const a = str => uniq(str.split(','))

module.exports = a
