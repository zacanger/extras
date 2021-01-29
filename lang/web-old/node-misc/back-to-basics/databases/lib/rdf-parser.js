'use strict'

const
  fs      = require('fs')
, cheerio = require('cheerio')

module.exports = (filename, callback) => {
  fs.readFile(filename, (err, data) => {
    if(err){
      return callback(err)
    }
    let
      $       = cheerio.load(data.toString())
    , collect = (index, elem) => {
        return $(elem).text()
    }
    callback(null, {
      _id      : $('pgterms\\:ebook').attr('rdf:about').replace('ebooks/', '')
    , title    : $('dcterms\\:title').text()
    , authors  : $('pgterms\\:agent pgterms\\:name').map(collect)
    , subjects : $('[rdf\\:resource$="/LCSH"] ~ rdf\\:value').map(collect)
    })
  })
}
