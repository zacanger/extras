// takes array of functions. each must have cb. each function's result is saved
// to results, passed to final cb. if any of them passes error, final cb is
// called immediately with error object, and remaining functions are ignored.

var parallel = function (arr, limit, callback) {
  callback = callback || function () {}
  if (!arr.length) {
    return callback()
  }
  var
    index     = 0
  , completed = 0
  , running   = 0
  , results   = []
  , processor = function() {
    while (running < limit && index < arr.length) {
      running++
      arr[index](function (err, result) {
        if (err) {
          callback(err)
          callback = function () {}
        } else {
          completed++
          running--
          results.push(result)
          if (completed >= arr.length) {
            callback(null, results)
          } else {
            processor()
          }
        }
      })
      index++
    }
  }
  processor()
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
parallel(tasks, 2, console.log)
