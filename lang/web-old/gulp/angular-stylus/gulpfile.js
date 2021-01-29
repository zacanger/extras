var gulp      = require('gulp')
  , stylus    = require('gulp-stylus')
  , watch     = require('gulp-watch')
  , connect   = require('gulp-connect')
  , concat    = require('gulp-concat')
  , uglify    = require('gulp-uglify')
  , uglifycss = require('gulp-uglifycss')
  , annotate  = require('gulp-ng-annotate')

gulp.task('server', function(){
  connect.server({
    livereload: true
  , root: ['.', './public']
  })
})

gulp.task('livereload', function(){
  return gulp.src(['./main/styles/*.styl', './main/src/*.js'])
  .pipe(watch())
  .pipe(connect.reload())
})

gulp.task('stylus', function(){
  return gulp.src('./main/styles/*.styl')
  .pipe(stylus())
  .pipe(uglifycss())
  .pipe(concat('styles.css'))
  .pipe(gulp.dest('./public/styles'))
})

gulp.task('js', function(){
  return gulp.src('./main/src/*.js')
  .pipe(annotate())
  .pipe(uglify())
  .pipe(concat('min.js'))
  .pipe(gulp.dest('./public/js'))
})

gulp.task('watch', function(){
  gulp.watch('./main/styles/*.styl', ['stylus'])
})

connect.server({port: 9999})

gulp.task('default', ['stylus', 'js', 'server', 'livereload', 'watch'])

