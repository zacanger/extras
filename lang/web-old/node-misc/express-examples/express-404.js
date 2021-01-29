#!/usr/bin/env node

'use strict'

const
  express = require('express')
, port    = process.env.PORT || 9876
, app     = express
, path    = require('path')

app
.use(express.static(__dirname + '/public'))
.use((req, res) => {
  res.sendFile(__dirname + '/404/index.html')
})
.listen(port, () => {
  console.log(`listening on ${port}`)
})

