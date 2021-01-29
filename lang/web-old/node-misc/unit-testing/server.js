'use strict'

const
  express    = require('express')
, bodyParser = require('body-parser')
, cors       = require('cors')
, products   = require('./controllers/productsCtrl')
, app        = express()
, port       = process.env.PORT || 3000

app
.use(bodyParser.json())
.use(express.static(__dirname + '/public'))
.post('/products', products.create)
.get('/products', products.index)
.get('/products/:id', products.show)
.put('/products/:id', products.update)
.delete('/products/:id', products.delete)
.listen(port, () => {
  console.log('listening on ' + port)
})

module.exports = app

