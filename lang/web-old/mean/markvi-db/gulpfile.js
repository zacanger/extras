var gulp     = require('gulp')
  , uglify   = require('gulp-uglify')
  , mincss   = require('gulp-cssmin')
  , concat   = require('gulp-concat')
  , connect  = require('gulp-connect')
  , watch    = require('gulp-watch')
  , annotate = require('gulp-ng-annotate')
  , tasklist = require('gulp-task-listing')

gulp.task('help', tasklist)

gulp.task('serve', function(){
  connect.server({
    livereload: true
  , root: './client'
  , port: 9876
  })
})

gulp.task('default', ['watch', 'serve'])

gulp.task('livereload', function(){
  gulp.src(['./client/**.js', './client/**.css', './client/**.html', './client/**.md'])
  .pipe(watch())
  .pipe(connect.reload())
})

gulp.task('js', function(){
  gulp.src('./client/scripts/**.js')
  .pipe(annotate())
  .pipe(uglify())
  .pipe(concat('js.min.js'))
  .pipe(gulp.dest('./public/js'))
})

gulp.task('css', function(){
  gulp.src('./client/styles/*.css')
  .pipe(mincss())
  .pipe(concat('css.min.css'))
  .pipe(gulp.dest('./public/css'))
})

gulp.task('html', function(){
  gulp.src(['./client/**.html'])
    .pipe(gulp.dest('./public'))
})

gulp.task('default', ['css', 'js', 'html', 'serve', 'livereload'], function(){
  console.log('we are up and running, over at ' + port + '!')
})
