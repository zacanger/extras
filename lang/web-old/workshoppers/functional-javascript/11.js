module.exports = (arr, fn, thisArg) => arr.reduce((ac, it, ix, arr) => {
  ac.push(fn.call(thisArg, it, ix, arr))
  return ac
}, [])

