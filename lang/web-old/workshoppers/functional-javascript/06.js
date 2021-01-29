module.exports = arr => arr.reduce((c, w) => {
  c[w] = ++ c[w] || 1
  return c
}, {})

