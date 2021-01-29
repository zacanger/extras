#!/usr/bin/env node

require('./index')

var werdz = {
  thingone : 'howdy'
, thingtwo : 'you'
}

var greets = '<strong>{thingone}</strong>, <em>{thingtwo}</em>'

console.log(greets.tmpl(werdz))

var msg = {
  name    : "zacanger"
, message : {
    text  : "howdy"
  , date  : "Tuesday, 23rd Feb."
  }
}

var display = [
  '<p>'
,   '<strong>{name}:</strong>'
,   '<span>{message.text}</span>'
,   '<em>{message.date}</em>'
, '</p>'
].join('')

console.log(display.tmpl(msg))

