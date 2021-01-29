var gulp       = require('gulp')
  , browserify = require('browserify')
  , streamify  = require('gulp-streamify')
  , uglify     = require('gulp-uglify')
  , source     = require('vinyl-source-stream')
  , sourcemaps = require('gulp-sourcemaps')
  , buffer     = require('gulp-buffer')

gulp.task('browserify', function(){
  var source = ['./src/**/*.js', './vend/**/*.js']
    , dest   = './build'

  var getName = function(){
    var version = require('./package.json').version
      , name    = require('./package.json').name
    return version + '.' + name + '.' + min
  }

  browserify({entries:source})

  .bundle()
  .pipe(source(getName() + '.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps:true}))
  .pipe(streamify(uglify({mangle:false})))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(dest))

})

