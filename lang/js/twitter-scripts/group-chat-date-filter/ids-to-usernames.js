const Twitter = require('twitter')
const config = require('../config')
const twitter = new Twitter(config)
const messages = require('./messages')

const users = [...new Set(messages.map((m) => m.senderId))]

users.forEach((id, idx) => {
  twitter.get('users/show', { user_id: id }, (err, res) => {
    if (err) console.log(id, err.message)
    else console.log(id, res.screen_name)
  })
})
