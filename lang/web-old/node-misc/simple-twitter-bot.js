// npm i twitter

const events = require('events')
const Twitter = require('twitter')

const auth = {
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
}

const connect = new Twitter(auth)
const eventEmitter = new events.EventEmitter()

const keywords = {
  track: '#cljs'
}

const stream = connect.stream('statuses/filter', keywords)

const likeTweet = (tweet) => {
  connect.post('favorites/create', tweet, (err, res) => {
    if (err) {
      console.trace(err)
    } else {
      console.log(`liked ${tweet.id}`)
    }
  })
}

eventEmitter.on('like', likeTweet)

stream.on('data', (d) => {
  eventEmitter.imit('like', { id: d.id_str })
})

stream.on('error', (err) => {
  console.trace(err)
})
