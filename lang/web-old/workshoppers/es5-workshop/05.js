const count = arr => arr.reduce((cmap, word) => {
  cmap[word] = ++ cmap[word] || 1
  return cmap
}, {})

module.exports = count

