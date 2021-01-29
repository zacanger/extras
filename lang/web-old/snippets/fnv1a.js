const fnv1a = (text) => {
  let hash = 2166136261
  for (var i = 0; i < text.length; ++i) {
    hash ^= text.charCodeAt(i)
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24)
  }
  return hash >>> 0
}

module.exports = fnv1a
