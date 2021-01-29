'use strict'

const
  gulp    = require('gulp')
, traceur = require('gulp-traceur')
, babel   = require('gulp-babel')
, plumber = require('gulp-plumber')
, srcPath = './es6/*.js'
, outPath = './es5ified'

gulp.task('traceur', () => {
  gulp.src([srcPath])
  .pipe(plumber())
  .pipe(traceur({blockBinding : true}))
  .pipe(gulp.dest(outPath + '/traceur'))
})

gulp.task('babel', () => {
  gulp.src([srcPath])
  .pipe(plumber())
  .pipe(babel())
  .pipe(gulp.dest(outPath + '/babel'))
})

gulp.task('watch', () => {
  gulp.watch([srcPath], ['traceur', 'babel'])
})

gulp.task('default', ['traceur', 'babel', 'watch'])

