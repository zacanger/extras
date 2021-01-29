const dates = require('./ids-by-date.json')
const users = require('./ids-by-username.json')

const finalMap = Object.keys(dates)
  .reduce((prev, curr) => {
    const username = users[curr]
    const newKey = username === 'undefined' ? curr : username
    prev[newKey] = dates[curr]
    return prev
  }, {})

require('fs').writeFileSync('./final.json', JSON.stringify(finalMap, null, 2))
