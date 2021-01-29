module.exports = (arr, fn, init) => {
  return (function red(idx, val) {
    if (idx > arr.length -1) {
      return val
    }
    return red(idx + 1, fn(val, arr[idx], idx, arr))
  })(0, init)
}

