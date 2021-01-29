var gulp    = require('gulp')
  , connect = require('gulp-connect')
  , stylus  = require('gulp-stylus')
  , watch   = require('gulp-watch')

gulp.task('webserver', function(){
  connect.server({
    livereload: true
  , root: ['.', '.tmp']
  , port: 9999
  , host: 'gulp.dev'
  })
})

gulp.task('livereload', function(){
  return gulp.src(['.tmp/css/*.css', '.tmp/js/*.js'])
  .pipe(watch())
  .pipe(connect.reload())
})

gulp.task('stylus', function(){
  return gulp.src('styl/css.styl')
  .pipe(stylus())
  .pipe(gulp.dest('.tmp/css'))
})

gulp.task('watch', function(){
  gulp.watch('styl/*.styl', ['stylus'])
})

gulp.task('default', ['stylus', 'webserver', 'livereload', 'watch'])

