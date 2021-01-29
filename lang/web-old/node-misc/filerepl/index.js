#!/usr/bin/env node

var temp	= require('temp')
  , fs    = require('fs')
  , repl  = require('repl').start('> ')
  , lastContents = {}

function hasChanged(file, newData){
  var oldData = lastContents[file]
  if (!oldData) return true
  if (oldData.length != newData.length) return true
  for (var i = 0, l = oldData.length; i < l; i++ ){
    if (oldData[i] != newData[i]) return true
  }
  return false
}

function reload(file){
  fs.readFile(file, function(er, data){
    if (er) throw er
    if (!hasChanged(file, data)) return
    if (file in lastContents) console.log('\n---( Reloading ' + file + ' )---')
    lastContents[file] = data
    temp.open('filerepl-temp-source', function(er, info){
      if (er) throw er
      fs.write(info.fd, data, 0, data.length, 0, function(er, written){
        if (er) throw er
        fs.close(info.fd, function(er){
          if (er) throw er
          try {
            var module = require(info.path)
            for (var each in module){
              repl.context[each] = module[each]
            }
          } catch(e) {
            console.log(e.stack)
          }
        })
      })
    })
  })
}

function start(file){
  reload(file)
  fs.watchFile(file, reload.bind(null, file))
}

start(process.argv[2])
