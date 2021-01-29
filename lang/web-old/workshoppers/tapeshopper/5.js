const
  test    = require('tape')
, feedCat = require(process.argv[2])

test('feeding a cat', (t) => {
  t.plan(2)
  t.equal(feedCat('cat food'), 'yum')
  t.throws(feedCat.bind(null, 'chocolate'))
})

