var gulp    = require('gulp')
  , connect = require('gulp-connect')

gulp.task('webserver', function(){
  connect.server({
    livereload: true
  , root: ['.']
  })
})

connect.server({port:9999})

gulp.task('default', ['webserver'])
