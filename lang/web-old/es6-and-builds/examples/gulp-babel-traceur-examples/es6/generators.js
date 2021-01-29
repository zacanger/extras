function* numberGenerator() {
  yield 1
  yield 2
  yield 3
}

var number = numberGenerator()
console.log(number.next()) // {value : 1, done : false}
console.log(number.next()) // {value : 2, done : false}
console.log(number.next()) // {value : 3, done : true}
console.log(number.next()) // {value : undefined, done : true}

// generator that returns numbers, infinitely
function* infiniteNumbers() {
  for (var i = 0; true; i++) {
    yield i
  }
}

// generator that takes specific amount from collection
function* take(coll, number) {
  var i = 0
  for (var i of coll) {
    if (number === i++) {
      return;
    }
    yield i
  }
}

// generator that grabs 100 numbers
for (var number of take(infiniteNumbers(), 10)) {
  console.log(number)
}
