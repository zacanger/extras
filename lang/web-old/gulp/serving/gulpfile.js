'use strict'

const gulp = require('gulp')

gulp.task('default', ['things', 'stuff'], (cb) => {
  var argv = require('minimist')(process.argv.slice(2))
  if(argv.serve){
    if(typeof argv.serve === 'number'){
      opt.port = argv.serve
      if(opt.port.toString().length != 4){
        throw new Error('must be a four-digit port!')
      }
    }
    var server = require('./server')
    server.init({
      port  : opt.port || 9999
    , root  : __dirname
    }, server.listen)
    gulp.watch('*.html', server.refresh)
  }
  gulp.watch('','')
})

