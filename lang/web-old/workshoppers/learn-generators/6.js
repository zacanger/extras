const ask = () => new Promise((resolve, reject) => resolve('foo'))

const run = gen => {
  const it = gen()
  function go (res) {
    if (res.done) {
      return res.value
    }
    return res.value.then(val =>
      go(it.next(val))
    , err => go(it.throw(err)))
  }
  go(it.next())
}

run(function * () {
  try {
    const a = yield ask()
    console.log(a)
  } catch (e) {
    console.log(e)
  }
})
