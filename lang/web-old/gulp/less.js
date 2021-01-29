var path     = require('path')
  , gulp     = require('gulp')
  , less     = require('gulp-less')
  , prefixer = require('gulp-autoprefixer')
  , minifier = require('gulp-minify-css')

gulp.task('less', function(){
  return gulp.src('./src/**/*.less')
  .pipe(less({paths:[path.join(__dirname, 'less', 'includes')]}))
  .pipe(prefixer({browsers:['last 2 versions'], cascade: false}))
  .pipe(minifier)
  .pipe(gulp.dest('./build'))
})

