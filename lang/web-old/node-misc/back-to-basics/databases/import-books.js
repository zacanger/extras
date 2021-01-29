#!/usr/bin/env node

'use strict'

const
  async     = require('async')
, file      = require('file')
, request   = require('request')
, rdfParser = require('./lib/rdf-parser')
, work      = async.queue((path, done) => {
  rdfParser(path, (err, doc) => {
    request({
      method : 'PUT'
    , url    : 'http://localhost:5984/books' + doc._id
    , json   : doc
    }, (err, res, body) => {
      if(err){
        throw Error(err)
      }
      console.log(res.statusCode, body)
      done()
    })
  })
}, 10)

console.log('walking')

file.walk(__dirname + '/cache', (err, dirPath, dirs, files) => {
  files.forEach((path) => {
    work.push(path)
  })
})
