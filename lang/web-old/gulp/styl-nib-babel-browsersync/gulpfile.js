const
  gulp        = require('gulp')
, babel       = require('gulp-babel')
, stylus      = require('gulp-stylus')
, nib         = require('nib')
, sourcemaps  = require('gulp-sourcemaps')
, browserSync = require('browser-sync').create()
, src         = {
  logic  : './src/logic.js'
, styles : './src/styles.styl'
, static : [
    './src/index.html'
  , require.resolve('babel-polyfill')
  ]
}

gulp.task('babel', () =>
  gulp.src(src.logic)
  .pipe(babel({
    sourceMaps : 'inline'
  , optional   : ['runtime']
  , loose      : ['all']
  }))
  .pipe(gulp.dest('./.dist'))
)

gulp.task('stylus', () =>
  gulp.src(src.styles)
  .pipe(sourcemaps.init())
  .pipe(stylus({
    use    : nib()
  , import : ['nib']
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./.dist'))
  .pipe(browserSync.stream())
)

gulp.task('static', () =>
  gulp.src(src.static).pipe(gulp.dest('./.dist'))
)

gulp.task('default', ['babel', 'stylus', 'static'], () => {
  browserSync.init({
    server : {
      baseDir : './.dist'
    }
  })

  gulp.watch(src.logic , ['babel']).on('change', browserSync.reload)
  gulp.watch(src.styles, ['stylus'])
  gulp.watch(src.static, ['static']).on('change', browserSync.reload)
})
