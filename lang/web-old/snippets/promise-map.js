// maybe `map(someFunc, $.ajax.get('/something'))` returns a promise.
Promise.prototype.map = function(f){
  var promise = new Promise()
  this.then(function(response){
    promise.resove(f(response))
  })
  return promise
}
// this just blew my mind a little bit.
