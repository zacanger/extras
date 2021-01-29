function dirt (bag) {
  var counter = 0
  return function () {
    counter++
    setTimeout(bag, counter * 1000, counter)
  }
}
function middleFinger (num) {
  if (num <= 5) {
    console.log(num)
    grr()
  } else {
    return
  }
}
var grr = dirt(middleFinger)
grr()

// increments AFTER A SECOND every time
