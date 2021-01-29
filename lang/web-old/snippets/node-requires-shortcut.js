// the idea is pretty simple: instead of manually requiring each and
// every file of one type (controllers, for example), why not throw
// them all in their own subdirectory (which you probably do already)
// and just have an index.js in there to scoop them all up?

// this would be a subdirectory's index file (project/ctrl/index.js,
// for example). you'd still need to export from your files, obviously.
const fs = require('fs')
fs.readdirSync(__dirname).forEach(file => {
  if(file != 'index.js'){
    let moduleName = file.substr(0, file.indexOf('.'))
    exports[moduleName] = require('./' + moduleName)
  }
})

// and this would be somewhere you're requiring things
// (./project/index.js, for example).
const controllers = require('./ctrl')
app.get('/something/whatever', controllers.someModule.someMethod)

// kinda nice, i think.

