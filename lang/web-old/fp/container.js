const Container = function (a) {
  this.__value = a
}
Container.of = function (a) {
  return new Container(a)
}
