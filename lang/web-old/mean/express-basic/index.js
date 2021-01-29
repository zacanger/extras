'use strict'

const
  express    = require('express')
, bodyparser = require('body-parser')
, service    = require('./service')
, port       = process.env.PORT || 3000
, app        = express()

app
.use(bodyparser.json())
.use(bodyparser.urlencoded({extended : true}))
.use(express.static(__dirname + '/public'))

service.attachService(app)

app.listen(port)
console.log('listening on ' + port)

