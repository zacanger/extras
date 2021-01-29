var gulp         = require('gulp')
  , stylus       = require('stylus')
  , watch        = require('gulp-watch')
  , connect      = require('gulp-connect')
  , concat       = require('gulp-concat')
  , uglifycss    = require('gulp-uglifycss')
  , tasklist     = require('gulp-task-listing')
  , port         = 4000

gulp.task('stylus', function(){
  gulp.src('styles/*.styl')
    .pipe(stylus())
    .pipe(uglifycss())
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('./public/styles'))
})

gulp.task('server', function(){
  connect.server({
    livereload: true
  , root: ('./public')
  })
})

gulp.task('livereload', function(){
  gulp.src('./public/**')
    .pipe(watch())
    .pipe(connect.reload())
})

gulp.task('watch', function(){
  gulp.watch('./public/**', ['livereload'])
})

gulp.task('help', tasklist)

connect.server({port: port})

gulp.task('default', ['stylus', 'server', 'livereload', 'watch'])
