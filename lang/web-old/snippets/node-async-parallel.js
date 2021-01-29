// takes array of functions. each must have cb. each function's result is saved
// to results, passed to final cb. if any of them passes error, final cb is
// called immediately with error object, and remaining functions are ignored.

var parallel = function (arr, callback) {
  callback = callback || function () {}
  if (!arr.length) {
    return callback()
  }
  var index = 0
  var results = []
  arr.forEach(function (fn) {
    fn(function (err, result) {
      if (err) {
        callback(err)
        callback = function () {}
      } else {
        index++
        results.push(result)
        if (index >= arr.length) {
          callback(null, results)
        }
      }
    })
  })
}

// example:
// using setTimout with random value to simulate async.
function task(num){
  return (cb) => {
    setTimeout(() => {
      console.log(num)
      cb(null, num)
    }, Math.random() * 1000)
  }
}
// array of tasks to run asynchronously
var tasks = [
  task(1),
  task(2),
  task(3),
  task(4),
  task(5)
]
// run them in parallel
parallel(tasks, console.log)
