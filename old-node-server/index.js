var resolve = require('path').resolve
  , join = require('path').join
  , exec = require('child_process').exec
  , program = require('commander')
  , connect = require('connect')
  , stylus = require('stylus')
  , jade = require('jade')
  , less = require('less-middleware')
  , url = require('url')
  , fs = require('fs')


program
  .version(require('./package.json').version)
  .usage('[options] [dir]')
  .option('-a, --auth <user>:<pass>', 'specify basic auth credentials')
  .option('-F, --format <fmt>', 'specify the log format string', 'dev')
  .option('-p, --port <port>', 'specify the port [3000]', Number, 3000)
  .option('-H, --hidden', 'enable hidden file serving')
  .option('-S, --no-stylus', 'disable stylus rendering')
  .option('-J, --no-jade', 'disable jade rendering')
  .option('    --no-less', 'disable less css rendering')
  .option('-I, --no-icons', 'disable icons')
  .option('-L, --no-logs', 'disable request logging')
  .option('-D, --no-dirs', 'disable directory serving')
  .option('-f, --favicon <path>', 'serve the given favicon')
  .option('-C, --cors', 'allows cross origin access serving')
  .option('    --compress', 'gzip or deflate the response')
  .option('    --exec <cmd>', 'execute command on each request')
  .parse(process.argv)

var server = connect()
  , path = resolve(program.args.shift() || '.')

if (program.auth) {
  var user = program.auth.split(':')[0]
  var pass = program.auth.split(':')[1]
  if (!user || !pass) throw new Error('user and pass required')
  server.use(connect.basicAuth(user, pass))
}

if (program.logs) server.use(connect.logger(program.format))

// to trick stylus.middleware
if (program.stylus) {
  server.use(function(req, res, next){
    req.url = req.url.replace(/\.styl$/, '.css')
    next()
  })
}

server.use(connect.static(path, { hidden: program.hidden }))
server.use(connect.favicon(program.favicon))
server.use(stylus.middleware({ src: path }))

if (program.jade) {
  server.use(function(req, res, next){
    if (!req.url.match(/\.jade$/)) return next()
    var file = join(path, url.parse(req.url).pathname)
    fs.readFile(file, 'utf8', function(err, str){
      if (err) return next(err)
      try {
        var fn = jade.compile(str, { filename: file })
        str = fn()
        res.setHeader('Content-Type', 'text/html')
        res.setHeader('Content-Length', Buffer.byteLength(str))
        res.end(str);
      } catch (err) {
        next(err)
      }
    })
  })
}

if (program.less) {
  server.use(less(path))
}

if (program.cors) {
  server.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept, x-csrf-token, origin')
    if ('OPTIONS' == req.method) return res.end()
    next()
  })
}

if (program.compress) {
  server.use(connect.compress())
}

if (program.exec) {
  server.use(function(req, res, next){
    exec(program.exec, next)
  })
}

if (program.dirs) {
    server.use(connect.directory(path, {
      hidden: program.hidden
    , icons: program.icons
  }))
}

server.listen(program.port, function(){
  console.log('\033[90mserving \033[36m%s\033[90m on port \033[96m%d\033[0m', path, program.port);
})

