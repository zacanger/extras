module.exports = (Bacon, promise, et, cb) => ({
  promise : Bacon.fromPromise(promise)
, et      : Bacon.fromEvent(et, 'data')
, cb      : Bacon.fromCallback(cb, 'foo', 'bar')
, array   : Bacon.fromArray([1, 2, 3, 4])
})
