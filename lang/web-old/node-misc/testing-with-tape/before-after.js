'use strict'

import test from 'tape'

// beforeEach and afterEach rely on shared state. so:
const
  before = test
, after  = test

// running something before and after _every_ test is usually totally superfluous
const setup = () => {
  const fixtures = {}
  // insert fixtures here
  // this way you get a fresh object every time you call `setup()`
  return fixtures
}

const teardown = (fixtures) => {
  // dispose of fixtures here
}

before('before', function(assert) {
  assert.pass('do something before tests')
  assert.end()
})

test('test with fixtures', (assert) => {
  const fixture = setup()
  assert.equal(typeof fixture, 'object',
    'fixture returns object')
  teardown(fixture)
  assert.end()
})

test('passing test', (assert) => {
  assert.pass('this test passes')
  assert.end()
})

test('assertions with tape', (assert) => {
  const
    expected = 'something to test'
  , actual   = 'something 2 test'
  assert.equal(actual, expected, 'bug report here?!')
  assert.end()
})

after('after', (assert) => {
  assert.pass('do something after tests')
  assert.end()
})

