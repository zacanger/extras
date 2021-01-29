var arr = ['a', 'b', NaN]
function contains (needle) {
  var findNaN = needle !== needle
  , indexOf
  if (!findNaN && typeof Array.prototype.indexOf === 'function') {
    indexOf = Array.prototype.indexOf
  } else {
    indexOf = function (needle) {
      var i = -1, index = -1
      for (i = 0; i < this.length; i++) {
        var item = this[i]
        if ((findNaN && item !== item) || item === needle) {
          index = i
          break
        }
      }
      return index
    }
  }
  return indexOf.call(this, needle) > -1
}
console.log(contains.call(arr, 'a'), contains.call(arr, NaN), contains.call(arr, 'c'))

