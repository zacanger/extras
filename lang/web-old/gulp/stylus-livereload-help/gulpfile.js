'use strict'

var
  gulp     = require('gulp')
, stylus   = require('gulp-stylus')
, watch    = require('gulp-watch')
, connect  = require('gulp-connect')
, concat   = require('gulp-concat')
, uglify   = require('gulp-uglify')
, ugcss    = require('gulp-uglifycss')
, annotate = require('gulp-ng-annotate')
, tasklist = require('gulp-task-listing')

gulp.task('server', function(){
  connect.server({
    livereload : true
  , root       : './public'
  , port       : 9999
  })
})

gulp.task('livereload', function(){
  return gulp.src('./public/**')
  .pipe(connect.reload())
})

gulp.task('stylus', function(){
  return gulp.src('./css/*.styl')
  .pipe(stylus())
  .pipe(ugcss())
  .pipe(concat('css.min.css'))
  .pipe(gulp.dest('./public'))
})

gulp.task('js', function(){
  return gulp.src('./js/*.js')
  .pipe(annotate())
  .pipe(uglify())
  .pipe(concat('js.min.js'))
  .pipe(gulp.dest('./public'))
})

gulp.task('watch', function(){
  gulp.watch('./css/*.styl', ['stylus', 'livereload'])
  gulp.watch('./js/*.js', ['js', 'livereload'])
})

gulp.task('help', tasklist)

gulp.task('default', ['stylus', 'js', 'server', 'livereload', 'watch'])

