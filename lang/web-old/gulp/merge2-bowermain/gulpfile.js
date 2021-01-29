'use strict'

const
  gulp    = require('gulp')
, stylus  = require('gulp-stylus')
, babel   = require('gulp-babel')
, concat  = require('gulp-concat')
, uglify  = require('gulp-uglify')
, watcher = gulp.watch('./js/*.js', ['minify'])
, filter  = require('gulp-filter')
, bfiles  = require('gulp-main-bower-files')
, merge   = require('merge2')
, cdnizer = require('gulp-cdnizer')

watcher.on('change', (event) => {
  console.log(event.path + ' was ' + event.type + ' at ' + new Date() + '; running tasks')
})

gulp.task('minify', () => {
  return gulp.src('./js/*.js')
  .pipe(babel({presets: ['es2015']}))
  .pipe(concat('minify.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist'))
})

gulp.task('default', ['minify']);

// gulp.task('shrink', function(){
//	return merge(thisThing, thatThing) // combines streams rather than needing to write to disk, hurray
// })

