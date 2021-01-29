'use strict'

const
  test    = require('tape')
, feedCat = require(process.argv[2])

test('cat feeding', t => {
  t.plan(2)
  t.equal(feedCat('food'), 'yum')
  t.throws(feedCat.bind(null, 'chocolate'))
})

