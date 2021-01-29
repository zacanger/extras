module.exports = Bacon =>
  Bacon.sequentially(10, [11, 12, 13]).toProperty(10)
