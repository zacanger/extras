const
  fs         = require('fs')
, test       = require('tape')
, Shot       = require('shot')
, createPost = require('../../handlers.js').createPost

test('createPost sends back correct status code', t => {
  const options = {
    method  : 'POST'
  , url     : '/create/post'
  , payload : 'hello node'
  }

  Shot.inject(createPost, options, res => {
    t.equal(res.statusCode, 302, 'Status code 302 comes back')
    t.end()
  })
})

