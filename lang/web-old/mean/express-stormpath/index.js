'use strict'

const
  express    = require('express')
, stormpath  = require('stormpath')
, port       = process.env.PORT || 3000
, app        = express()

app
.set('views', './views')
.set('view engine', 'jade')
.use(stormpath.init(app, {expand : {customData : true}}))
.get('/', stormpath.getUser, (req, res) => {res.render('home', {title : 'home'})})
.use('/profile', stormpath.loginRequired, require('./profile')())
.on('stormpath.ready', () => {console.log('stormpath ready')})
.listen(port, () => {console.log('listening on ' + port)})
