#!/usr/bin/env node

'use strict'

const
  file      = require('file')
, rdfParser = require('./lib/rdf-parser')

console.log('walking dir')

file.walk(__dirname + '/cache', (err, dirPath, dirs, files) => {
  files.forEach((path) => {
    rdfParser(path, (err, doc) => {
      if(err){
        throw err
      } else {
        console.log(doc)
      }
    })
  })
})
