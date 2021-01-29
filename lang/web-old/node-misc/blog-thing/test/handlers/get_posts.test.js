const
  fs       = require('fs')
, test     = require('tape')
, Shot     = require('shot')
, getPosts = require('../../handlers.js').getPosts

const writeFakeData = callback => {
  const time = Date.now()
  let posts = {}
  posts[time] = 'something here'

  fs.writeFile('./blog.json', JSON.stringify(posts, null, 4), err => {
    if (err) {
      return err
    }
    callback
  })
}

const emptyData = () => {
  fs.writeFile('./blog.json', JSON.stringify({}, null, 4), err => {
    if (err) {
      return err
    }
  })
}

test('/ serves up index.html', t => {
  const options = {
    method : 'GET'
  , url    : '/posts'
  }
  writeFakeData(
    Shot.inject(getPosts, options, res => {
      let payload = JSON.parse(res.payload)

      t.equal(res.statusCode, 200, 'okay')
      t.equal(typeof payload, 'object', 'object')
      t.end()
      emptyData()
    })
  )
})

