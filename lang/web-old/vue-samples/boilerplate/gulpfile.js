const
  gulp    = require('gulp')
, webpack = require('webpack-stream')
, watch   = require('gulp-watch')
, batch   = require('gulp-batch')
, connect = require('gulp-connect')
, copy    = require('gulp-copy')

gulp.task('webpack', () => {
  return gulp.src('src/main.js')
  .pipe(webpack( require('./webpack.config.js') ))
  .pipe(gulp.dest('dist/js/'))
  .pipe(connect.reload())
})

gulp.task('serve', () => {
  connect.server({
    livereload : true
  , root       : 'dist'
  })
})

gulp.task('html', () => {
  return gulp.src('./src/index.html')
  .pipe(gulp.dest('./dist'))
})

gulp.task('default', ['webpack', 'serve', 'html'])

