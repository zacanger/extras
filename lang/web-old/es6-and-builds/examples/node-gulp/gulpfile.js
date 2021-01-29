const
  gulp       = require('gulp')
, sourcemaps = require('gulp-sourcemaps')
, babel      = require('gulp-babel')
, path       = require('path')

var paths = {
  es6        : ['es6/**/*.js']
, es5        : 'es5'
, sourceRoot : path.join(__dirname, 'es6')
}

gulp.task('babel', () => {
  return gulp.src(paths.es6)
  .pipe(sourcemaps.init())
  .pipe(babel({presets : ['es2017']}))
  .pipe(sourcemaps.write('.', {sourceRoot : paths.sourceRoot}))
  .pipe(gulp.dest(paths.es5))
})

gulp.task('watch', () => {
  gulp.watch(paths.es6, ['babel'])
})

gulp.task('default', ['babel', 'watch'])
