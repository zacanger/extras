const repeat = (o, n) => () => {
  if (n <= 0) {
    return
  }
  o()
  return repeat(o, --n)
}

const trampoline = fn => {
  while (fn && typeof fn === 'function') {
    fn = fn()
  }
}

module.exports = (o, n) => {
  trampoline(() => repeat(o, n))
}

