'use strict'

const _ = require('lodash')

const sorter = function(collection){
  return _.sortBy(collection, (item) => {
    return -item.quantity
  })
}

module.exports = sorter

