const repeat = (o, n) => {
  if (n <= 0) {
    return
  }
  o()
  if (n % 10 === 0) {
    setTimeout(() => {
      repeat(o, --n)
    })
  } else {
    repeat(o, --n)
  }
}

module.exports = repeat

