const _ = require('lodash')

const count = comments => {
  const counted = []
  comments = _.groupBy(comments, 'username')
  _.forEach(comments, (item, name) => {
    counted.push({
      username      : name
    , comment_count : _.size(item)
    })
  })
  return _.sortBy(counted, 'comment_count').reverse()
}

module.exports = count
