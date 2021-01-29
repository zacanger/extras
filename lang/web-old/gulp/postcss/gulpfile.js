const
  gulp              = require('gulp')
, postcss           = require('gulp-postcss')
, postcssImport     = require('postcss-import')
, autoprefixer      = require('autoprefixer')
, simpleVars        = require('postcss-simple-vars')
, mixins            = require('postcss-mixins')
, colorFunction     = require('postcss-color-function')
, nested            = require('postcss-nested')
, cssnano           = require('cssnano')
, reporter          = require('postcss-reporter')
, stylelint         = require('stylelint')
, stylelinterConfig = require('./.stylelintrc')
, sourcemaps        = require('gulp-sourcemaps')
, gutil             = require('gutil')
, notify            = require('gulp-notify')

gulp.task('lint-styles', () => {
  return gulp.src('src/**/*.css')
  .pipe(postcss([
    stylelint(stylelinterConfig)
  , reporter({ clearMessages : true })
  ]))
})

gulp.task('styles', ['lint-styles'], () => {
  const processors = [
    postcssImport({glob : true})
  , mixins
  , simpleVars
  , colorFunction()
  , nested
  , autoprefixer({ browsers: ['last 2 version', 'safari 5', 'opera 12.1', 'ios 6', 'android 2.3'] })
  , cssnano
  ]
  return gulp.src('src/styles.css')
  .pipe(sourcemaps.init())
  .pipe(postcss(processors).on('error', gutil.log))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./dist'))
  .pipe(notify('styles'))
})

gulp.task('watch', () => {
  gulp.watch('src/*.css', ['styles'])
})

gulp.task('default', ['styles', 'watch'])

