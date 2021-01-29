const mult = () => val1 => val2 => val1 * val2
const twice = mult(2)

// or, esold
function mult() {
  return function(val1) {
    return function(val2) {
      return val1 * val2
    }
  }
}
var twice = mult(2)
