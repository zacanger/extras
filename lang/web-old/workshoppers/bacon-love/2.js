var streamGenerator = function(Bacon, promise, eventTarget, callback){
  return {
    promise: Bacon.fromPromise(promise)
  , eventTarget: Bacon.fromEventTarget(eventTarget, 'data')
  , callback: Bacon.fromCallback(callback, 'asdf', 'ghjkl')
  , array: Bacon.fromArray([1, 2, 3, 4])
  }
}

module.exports = streamGenerator

