const Left = function (a) {
  this.__value = a
}

Left.of = function (a) {
  return new Left(a)
}

Left.prototype.map = function (f) {
  return this
}

const Right = function (a) {
  this.__value = a
}

Right.of = function (a) {
  return new Right(a)
}

Right.prototype.map = function (f) {
  return Right.of(f(this.__value))
}
