const gulp = require('gulp')

gulp.task('copy', () => {
  return gulp.src('./src/*.html')
  .pipe(gulp.dest('./build'))
})
