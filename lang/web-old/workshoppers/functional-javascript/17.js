const curry = function(f, n) {
  n = n || f.length
  return function cd(arg) {
    if (n <= 1) {
      return f(arg)
    }
    return curry(f.bind(this, arg), n - 1)
  }
}

module.exports = curry

