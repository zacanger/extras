const _ = require('lodash')

const overview = orders => {
  let
    overviewArr = []
  , total       = 0

  orders = _.groupBy(orders, 'article')

  _.forEach(orders, (item, key) => {
    key = parseInt(key)
    total = 0

    if (item.length === 1) {
      total = item[0].quantity
    } else {
      total = _.reduce(item, (sum, item) => {
        return sum + item.quantity
      }, 0)
    }

    overviewArr.push({
      article      : key
    , total_orders : total
    })
  })

  overviewArr = _.sortBy(overviewArr, 'total_orders').reverse()
  return overviewArr
}

module.exports = overview
