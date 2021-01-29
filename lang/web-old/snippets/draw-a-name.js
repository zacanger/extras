#!/usr/bin/env node

// reads list of unique names from stdin;
// prints to stdout when stream closes.

var es     = require('event-stream')
  , random = require('random-item-in-array')
  , names  = {}

process.stdin
  .pipe(es.split())
  .pipe(es.mapSync(function(name){
    if (name && name.length) return name
  }))
  .on('data', function(name){
    names[name] = name
  })
  .on('end', function(){
    console.log('Names received', Object.keys(names))

    var toAssign = Object.keys(names)

    names = Object.keys(names).reduce(function(prev, curr){
      var name = random(
        toAssign // get a name that isn't their own
          .filter(function(name){
          return name !== curr
      }))

      // Remove it from the list of available names
      toAssign.splice(toAssign.indexOf(name), 1)

      // Make the assignment
      prev[curr] = name
      return prev
    }, {})

    console.log('assignments:', names)
  })
