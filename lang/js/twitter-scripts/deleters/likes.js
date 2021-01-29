const Twitter = require('twitter')
const config = require('../config')

// replace the window ytd stuff witha module.exports
const allLikes = require('../twitter-export/like').map((a) => a.like.tweetId)

const client = new Twitter({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token_key: config.access_token_key,
  access_token_secret: config.access_token_secret
})

;(() => {
  deleteLike(allLikes, 0)
})()

function deleteLike (likes, i) {
  let next = 100
  let remaining = 0

  if (!likes[i]) return
  client.post('favorites/destroy', { id: likes[i] }, function (err, t, res) {
    if (res.headers.status.includes('429')) {
      console.log(res.headers.status)
    }
    Object.keys(res.headers).forEach((h) => {
      if (/rate/i.test(h)) {
        console.log(res.headers[h])
      }
    })

    remaining = parseInt(res.headers['x-rate-limit-remaining'])

    if (!isNaN(remaining) && remaining === 0) {
      console.log('Waiting')
      next = parseInt(res.headers['x-rate-limit-reset']) - Date.now()
    } else {
      if (err) {
        console.log(JSON.stringify(err))
      } else {
        console.log(`Deleted ${i} of ${likes.length}`)
      }
    }

    console.log(`Next call in ${next}ms`)
    setTimeout(function () {
      deleteLike(likes, i + 1)
    }, next)
  })
}
