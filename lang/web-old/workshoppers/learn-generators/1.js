function * range (from, to) {
  for (let i = from; i <= to; i++) {
    yield i
  }
}

for (let a of range(5, 10)) {
  console.log(a)
}
