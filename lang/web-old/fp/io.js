const { compose } = require('zeelib')

const IO = function (f) {
  this.unsafePerformIO = f
}

IO.of = function (a) {
  return new IO(() => a)
}

IO.prototype.map = function (f) {
  return new IO(_.compose(f, this.unsafePerformIO))
}
