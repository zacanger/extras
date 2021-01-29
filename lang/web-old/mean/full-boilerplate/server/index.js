'use strict'

const
  express    = require('express')
, bodyParser = require('body-parser')
, cors       = require('cors')
, port       = 8080
, app        = express()
, mongoose   = require('mongoose')
, session    = require('express-session')
, config     = require('./.config.js')
, mongoURI   = 'mongodb://127.0.0.1:27017/db'
, db         = mongoose.connection

mongoose.connect(mongoURI)
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('connected to mongo')
})

app.use(session({secret: config.secret}))

app.use(express.static(__dirname + '../dist'))
app.use(cors())
app.options('*', cors())
app.use(bodyParser.json())

app.listen(port, () => {
  console.log('Listening on port ' + port)
})

module.exports = app
