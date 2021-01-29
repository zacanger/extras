'use strict'

const
  test           = require('tape')
, repeatCallback = require(process.argv[2])

test('repeatCallback', t => {
  t.plan(4)
  repeatCallback(4, () => {
    t.pass('callback called')
  })
})

