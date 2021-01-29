const _ = require('lodash')

const analyze = item => {
  let
    average
  , underperform
  , overperform

  item = _.sortBy(item, 'income')

  average = _.reduce(item, (sum, num) =>{
    return sum + num.income
  }, 0)

  average = average / item.length

  underperform = _.filter(item, num => num.income <= average)

  return {
    average
  , underperform
  , overperform
  }
}

module.exports = analyze
