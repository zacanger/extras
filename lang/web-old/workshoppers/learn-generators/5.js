const { readdir } = require('fs')

const run = gen => {
  const it = gen(go)
  function go (err, res) {
    if (err) {
      return it.throw(err)
    }
    it.next(res)
  }
  go()
}

run(function * (done) {
  let first
  try {
    const dir = yield readdir('NoNoNoNo', done)
    first = dir[0]
  } catch (e) {
    first = null
  }
  console.log(first)
})
