const
  app    = require('express')
, read   = require('./read')
, update = require('./update')

app
.use('/read', read)
.use('/update', update)
.listen(3000)

console.log('listening on ' + port)

