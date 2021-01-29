const
  test    = require('tape')
, fancify = require(process.argv[2])

test('fancify', (t) => {
  t.equal(fancify('foo'), '~*~foo~*~', 'wraps str in ~*~')
  t.equal(fancify('foo', true), '~*~FOO~*~', 'makes all caps with true passed')
  t.equal(fancify('foo', false, '!'), '~!~foo~!~', 'allows setting char with third arg')
  t.end()
})

