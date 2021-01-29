// based on https://github.com/hugocaillard/tweets-cleaner/blob/master/tweets-cleaner.js
// but with some changes

const Twitter = require('twitter')
const config = require('../config')

// replace the window ytd stuff with a module.exports
const tweetJson = require('../twitter-export/tweet')

const maxDate = config.maxDate ? new Date(config.maxDate) : new Date()

const client = new Twitter({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token_key: config.access_token_key,
  access_token_secret: config.access_token_secret
})

const log = []
;(() => {
  const json = tweetJson
  const logIds = log.map(l => l.id)
  const tweets = json.filter(t => {
    const hasId = !isNaN(parseInt(t.id))
    const d = new Date()
    d.setMonth(d.getMonth() - 1)
    const oldEnough = new Date(t.created_at) < d
    const shouldBeSaved = config.saveRegexp.some((regexp) => new RegExp(regexp).test(t.full_text))
    const notDeleted = logIds.indexOf(t.id) === -1
    return hasId && oldEnough && notDeleted && !shouldBeSaved
  })
  console.log(tweets.length)

  if (!tweets || !tweets.length) {
    return console.log('No more tweets to delete!')
  }

  console.log(`Starting tweets cleaner on ${Date.now()} - Deleting tweets older than ${maxDate}`)
  deleteTweet(tweets, 0)
})()

function deleteTweet (tweets, i) {
  let next = config.callsInterval
  let remaining = 0

  client.post('statuses/destroy', { id: tweets[i].id }, function (err, t, res) {
    remaining = parseInt(res.headers['x-rate-limit-remaining'])

    if (!isNaN(remaining) && remaining === 0) {
      console.log('Waiting')
      next = parseInt(res.headers['x-rate-limit-reset']) - Date.now()
    } else {
      if (err) {
        console.log(JSON.stringify(err))
      } else {
        log.push(tweets[i])
        console.log(`Deleted -> ${tweets[i].id} | ${i} of ${tweets.length} \n ${tweets[i].full_text}\n`)
      }
    }

    if (i + 1 === tweets.length) {
      return console.log('Done!')
    }

    console.log(`Next call in ${next}ms`)
    setTimeout(function () {
      deleteTweet(tweets, i + 1)
    }, next)
  })
}
