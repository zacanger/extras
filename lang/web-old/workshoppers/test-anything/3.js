'use stict'

const
  test    = require('tape')
, fancify = require(process.argv[2])

test('fancify', t => {
  t.equal(fancify('foo'), '~*~foo~*~', 'wraps str w ~*~')
  t.equal(fancify('foo', true), '~*~FOO~*~', 'caps')
  t.equal(fancify('foo', false, '%'), '~%~foo~%~', 'can set char')
  t.end()
})

