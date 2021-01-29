'use strict'

import {join}      from 'path'
import express     from 'express'
import ReactEngine from 'react-engine'
import items       from './items.json'
import routes      from './public/routes.jsx'

const PORT = process.env.PORT || 3000

let app = express()

let engine = ReactEngine.server.create({
  routes         : routes
, routesFilePath : join(__dirname, '/public/routes.jsx')
, performanceCollector(stats){
    console.log(stats)
  }
})

app
.engine('.jsx', engine)
.set('views', join(__dirname, '/public/views'))
.set('view engine', 'jsx')
.set('view', ReactEngine.expressView)
.use(express.static(join(__dirname, '/public')))

.get('/api/items', (req, res) => {
  setTimeout(() => {
    res.json(items)
    setTimeout(() => {
      emitStatus(items)
    }, 1000)
  }, 1000)
})

.get('*', (req, res) => {
  res.render(req.url, {})
})

.use((err, req, res, next) => {
  console.error(err)

  if (res.headersSent) {
    return next(err)
  }

  if (err._type && err._type === ReactEngine.reactRouterServerErrors.MATCH_REDIRECT) {
    return res.redirect(302, err.redirectLocation)
  } else if (err._type && err._type === ReactEngine.reactRouterServerErrors.MATCH_NOT_FOUND) {
    return res.status(404).send('Route Not Found!')
  } else {
    return res.status(500).send(err.message)
  }
})

const server = app.listen(PORT, () => {
  console.log('Example app listening at port %s', PORT)
})

const io = require('socket.io')(server)

function emitStatus (items) {
  let status = []
  for (let i in items) {
    let item = items[i]
    let s    = {}
    s.status = (Math.random() < .5) ? 'active' : 'error'
    s.id = item.id
    setTimeout(status => {
      io.emit('status', [status])
    }, (Math.floor((Math.random() * 900) + 100)), s)
  }
}

