'use strict'

const _ = require('lodash')

const thing = function (item){
  return _.filter(item, {active : true})
}

module.exports = thing

