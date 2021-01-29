'use strict'

const
  test = require('tape')
, asdf = require('../')

test('something, i guess', (t) => {
  t.plan(2)
  let x = asdf()
  t.equal(x.foo(2), 22)
  x.bar((err, res) => {
    t.equal(res, 'baz')
  })
})

// run with node this-file.js

