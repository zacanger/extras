/* jshint node: true */

'use strict'

const
  gulp           = require('gulp')
, stylus         = require('gulp-stylus')
, concat         = require('gulp-concat')
, uglify         = require('gulp-uglify')
, server         = require('gulp-webserver')
, annotate       = require('gulp-ng-annotate')
, mainBowerFiles = require('main-bower-files')
, cleanCSS       = require('gulp-clean-css')
, sourcemaps     = require('gulp-sourcemaps')
, postcss        = require('gulp-postcss')
, autoprefixer   = require('autoprefixer')
, processors     = [autoprefixer()]

gulp.task('server', () => {
  gulp.src('./dist')
  .pipe(server({
    livereload : true
  , port       : 9090
  }))
})

gulp.task('stylus', () => {
  gulp.src('./src/styles/*.styl')
  .pipe(sourcemaps.init())
  .pipe(stylus())
  .pipe(cleanCSS())
  .pipe(postcss(processors))
  .pipe(concat('css.min.css'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./dist'))
})

gulp.task('bowerjs', () => {
  gulp.src(mainBowerFiles('**/*.js'))
  .pipe(sourcemaps.init())
  .pipe(uglify())
  .pipe(concat('lib.min.js'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./dist'))
})

gulp.task('bowercss', () => {
  gulp.src(mainBowerFiles('**/*.css'))
  .pipe(cleanCSS())
  .pipe(concat('lib.min.css'))
  .pipe(gulp.dest('./dist'))
})

gulp.task('js', () => {
  gulp.src('./src/scripts/*.js')
  .pipe(sourcemaps.init())
  .pipe(annotate())
  .pipe(uglify())
  .pipe(concat('js.min.js'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./dist'))
})

gulp.task('watch', () => {
  gulp.watch('./src/styles/*.styl', ['stylus'])
  gulp.watch('./src/scripts/*.js', ['js'])
  gulp.watch('./dist/*.html')
})

gulp.task('default', ['stylus', 'js', 'server', 'watch', 'bowerjs', 'bowercss'])
