var myLogger = msg => console.log(msg) // anonymous function

myLogger('arrow functions!')

// "this," the old way
function Car () {
  var self = this
  this._seats = 4

  this.timeout = function () {
    setTimeout(function () {
      console.log(self._seats++)
    }, 1000)
  }
}

// "this," the new way
class CarWithArrow {
  constructor() {
    this._seats = 6
  }
  timeout() {
    setTimeout(() => {
      console.log(this._seats++)
    }, 1000)
  }
}

var c = new Car()
c.timeout()
var cArrow = new CarWithArrow()
cArrow.timeout()

