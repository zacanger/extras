function * upperCase (strings) {
  for (const str of strings) {
    try {
      yield str.toUpperCase()
    } catch (e) {
      yield null
    }
  }
}

const arr = ['a', 'B', 1, 'c']

for (const e of upperCase(arr)) {
  console.log(e)
}
