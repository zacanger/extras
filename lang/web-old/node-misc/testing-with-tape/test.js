import test from 'tape'

test('A passing test', (assert) => {
  assert.pass('This will pass')
  assert.end()
})

test('Tape assertions', (assert) => {
  const
    expected = 'something to test'
  , actual   = 'something 2 test'
  assert.equal(actual, expected,
    '.equal() should provide a good report here')
  assert.end()
})

