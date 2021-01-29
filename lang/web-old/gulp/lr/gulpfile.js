'use stict'

// this is not at all a good example of a gulpfile.
// you wouldn't normally do things this way, like, ever.

// this IS a good example of setting up a gulpfile with
// basically no actual gulp plugins, though.

const
  gulp    = require('gulp')
, gutil   = require('gulp-util')
, express = require('express')
, path    = require('path')
, tinylr  = require('tiny-lr')
, createServers = (port, lrport) => {
  let
    app = express()
  , lr  = tinylr()

  lr.listen(lrport, () => {
    gutil.log('livereload over at', lrport)
  })

  app.use(express.static(path.resolve('./')))
  app.listen(port, () => {
    gutil.log('express on', port)
  })

  return {
    lr  : lr
  , app : app
  }
}

const servers = createServers(9876, 35729)

gulp.task('default', () => {
  gulp.watch(['./**/*', '!./node_modules/**/*'], (evt) => {
    gutil.log(gutil.colors.cyan(evt.path), 'changed')
    servers.lr.changed({
      body : {files : [evt.path]}
    })
  })
})
