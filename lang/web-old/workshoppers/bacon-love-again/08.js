module.exports = (Bacon, messages, keys, decoderFn) =>
  messages.zip(keys).map(decoderFn)
