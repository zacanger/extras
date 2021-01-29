const Maybe = function (a) {
  this.__value = a
}

Maybe.of = function (a) {
  return new Maybe(a)
}

Maybe.prototype.isNothing = function () {
  return this.__value === null || this.__value === undefined
}

Maybe.prototype.map = function (f) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value))
}
