const messages = require('./messages')

const filtered = messages
  .map(({
    createdAt,
    senderId
  }) => ({
    createdAt,
    senderId
  }))
  .reduce((prev, curr) => {
    const { senderId, createdAt } = curr
    prev[senderId] = prev[senderId] || []
    prev[senderId].push(new Date(createdAt))
    const latest = prev[senderId].sort((a, b) => b - a)[0]
    prev[senderId] = [latest]
    return prev
  }, {})

const flattened = Object.keys(filtered)
  .reduce((prev, curr) => {
    prev[curr] = filtered[curr][0]
    return prev
  }, {})

require('fs').writeFileSync('./ids-by-date.json', JSON.stringify(flattened, null, 2))
