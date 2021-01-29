// fs will let me open/read/write directly
// path lets me describe and parse paths in as much of a
// platform-agnostic way as possible (basically it lets us
// work with ms's damned backslashes...)
// shell is an electron-specific thing that lets me execute
// a file using the OS's default handler
// spawn lets us communicate with other executables,
// and give them access to stdin and stdout

var fs    = require('fs')
  , path  = require('path')
  , p     = path.join(__dirname, '..', 'foo.js')
  , x     = path.join(__dirname, '..', 'thing.executable')
  , shell = require('shell')
  , spawn = require('child_process').spawn
  , child = spawn(x, ['p', '--debug'])

fs.readFile(p, 'utf8', function(err, data){
  if(err) return{console.log(err)}
  // do stuff witih data
})

shell.openItem(p)
shell.openExternal('http://zacanger.com')

