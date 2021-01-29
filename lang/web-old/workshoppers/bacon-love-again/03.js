module.exports = (Bacon, stream, action, actionOnVal) => {
  stream
    .doAction(action)
    .log('Value:')
    .onValue(actionOnVal)
  return stream
}
