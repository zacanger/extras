#!/usr/bin/env node

'use strict'

const
  async     = require('async')
, file      = require('file')
, rdfParser = require('./lib/rdf-parser')
, work      = async.queue((path, done) => {
  rdfParser(path, (err, doc) => {
    console.log(doc)
    done()
  })
}, 1000)

console.log('walking')

file.walk(__dirname + '/cache', (err, dirPath, dirs, files) => {
  files.forEach((path) => {
    work.push(path)
  })
})
