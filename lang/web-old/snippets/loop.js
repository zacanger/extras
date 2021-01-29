const loop = (() => {
  const recur = (cb, count, i = 0) => {
    if (i === count - 1) return cb(i)
    cb(i)
    return recur(cb, count, i + 1)
  }
  return (cb, count) => {
    if (count > 0) return recur(cb, count)
  }
})()

// usage:
const f = (n) => {
  console.log(n)
  return 'Done'
}
const res = loop(f, 4) // 0, 1, 2, 3
console.log(res) // 'Done'
