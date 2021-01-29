const
  test    = require('tape')
, isEmpty = require('../../util.js').isEmpty
, mocks   = require('../mocks/fake_data.mock.js')

test('If isEmpty returns true for not-an-object', t => {
  let notAnObject = mocks.notAnObject()
  t.ok(isEmpty(notAnObject))
  t.end()
})

test('If isEmpty returns true for an empty object', t => {
  let emptyObject = mocks.emptyObject()
  t.ok(isEmpty(emptyObject))
  t.end()
})

test('If isEmpty returns false for an object with keys', t => {
  let fakeBlogData = mocks.fakeBlogData()
  t.notOk(isEmpty(fakeBlogData))
  t.end()
})

