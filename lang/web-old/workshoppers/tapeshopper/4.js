const
  test           = require('tape')
, repeatCallback = require(process.argv[2])

test('repeatCallback', (t) => {
  t.plan(8)
  repeatCallback(8, () => {
    t.pass('callback')
  })
})

