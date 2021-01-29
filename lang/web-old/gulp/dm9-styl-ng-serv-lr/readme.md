first `npm i -g gulp gulp-cli`

`npm init`, and fill out any info you'd like to have here.

install these development dependencies:
`npm i -D gulp gulp-concat gulp-ng-annotate gulp-stylus gulp-uglify gulp-uglifycss gulp-webserver`

`npm i -D` is shorthand for `npm install --save-dev`

to see all the tasks in your gulpfile, use `gulp --tasks`

gulp's basic syntax is like so:

```javascript
gulp.task('taskName', function(){
  gulp.src('./source-directory/source-files.extension')
  .pipe(taskname())
  .pipe(othertask())
  .pipe(gulp.dest('./output-directory'))
})
```

instead of tying `function()` over and over again, we'll be using the `() =>` syntax.

a usual gulpfile setup will look like:

```
requires

task
task
task
etc

default task (takes array of other tasks to run)
```

the default is what will be run by just typing in `gulp`.

any other tasks can still be run individually with `gulp taskname`

gulp is a really powerful tool, and can run almost any tasks you need it to run.
just like everything else, there are other options, though. webpack and browserify both target
front-end code specifically (webpack is _vital_ for react development); grunt, like gulp, is a
general-purpose task runner.

