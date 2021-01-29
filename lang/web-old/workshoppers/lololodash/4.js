'use strict'

const _ = require('lodash')

const temp = function(item){
  let result = {hot : [], warm : []}
  function check(item){
    return item > 19
  }
  _.forEach(item, (town, townname) => {
    if(_.every(town, check)){
      result.hot.push(townname)
    } else if(_.some(town, check)){
      result.warm.push(townname)
    }
  })
  return result
}

module.exports = temp

