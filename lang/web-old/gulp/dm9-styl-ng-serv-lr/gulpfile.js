'use strict'

const
  gulp     = require('gulp')
, stylus   = require('gulp-stylus')
, concat   = require('gulp-concat')
, uglify   = require('gulp-uglify')
, server   = require('gulp-webserver')
, uglicss  = require('gulp-uglifycss')
, annotate = require('gulp-ng-annotate')

gulp.task('server', () => {
  return gulp.src('./dist')
  .pipe(server({
    livereload : true
  , open       : true
  , port       : 9999
  }))
})

gulp.task('stylus', () => {
  return gulp.src('./src/styles/*.styl')
  .pipe(stylus())
  .pipe(uglicss())
  .pipe(concat('css.min.css'))
  .pipe(gulp.dest('./dist'))
})

gulp.task('js', () => {
  return gulp.src('./src/scripts/*.js')
  .pipe(annotate())
  .pipe(uglify())
  .pipe(concat('js.min.js'))
  .pipe(gulp.dest('./dist'))
})

gulp.task('watch', () => {
  gulp.watch('./src/styles/*.styl', ['stylus'])
  gulp.watch('./src/scripts/*.js', ['js'])
})

gulp.task('default', ['stylus', 'js', 'server', 'watch'])

