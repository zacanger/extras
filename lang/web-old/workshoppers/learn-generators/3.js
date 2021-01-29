function * flatten (arr) {
  if (Array.isArray(arr)) {
    for (let i = 0; i < arr.length; i++) {
      yield * flatten(arr[i])
    }
  } else {
    yield arr
  }
}

const a = [1, [2, [3, 4], 5], 6]

for (let f of flatten(a)) {
  console.log(f)
}
