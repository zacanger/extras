// invokes until function returns truthy val

// usage
// Succeeds after 15 calls
let i = 0
invoker(20, 100)(() => {
  console.log(i)
  return ++i > 15
}, console.log)

// Fails after 20 calls
let ii = 0
invoker(20, 100)(() => {
  console.log(ii)
  return ++ii > 22
}, console.log)

const invoker = (limit, interval) => {
  return (fn, cb) => {
    let current = 0
    let _fn = () => {
      current++
      let result = fn()
      if (result) {
        cb(null, result)
      } else if (current < limit) {
        setTimeout(_fn, interval)
      } else {
        cb(new Error('Limit exceeded!'), null)
        cb = () => {}
      }
    }
    _fn()
  }
}
