var gulp         = require('gulp'),
    childProcess = require('child_process'),
    electron     = require('electron-prebuilt');

gulp.task('default', function(){
  childProcess.spawn(electron, ['./app'], {stdio: 'inherit' });
});
