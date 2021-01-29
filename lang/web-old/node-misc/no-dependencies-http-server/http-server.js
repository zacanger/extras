const
  http      = require('http')
, url       = require('url')
, fs        = require('fs')
, path      = require('path')
, baseDir   = path.dirname(require.main.filename)
, routesDir = path.join(baseDir, 'routes/')

const start = (port, host) => {
  host = host || undefined

  http.createServer((req, res) => {
    let info    = {}
    info.path   = url.parse(req.url).pathname
    info.params = []
    info.data   = ''
    info.method = req.method

    if (req.method === 'POST' || req.method === 'PUT') {
      req.on('data', data => {
        info.data += data
      })
    }

    req.on('end', () => {
      (info.data !== '') ? info.data = JSON.parse(info.data) : {}
      router(info, res)
    })
  }).listen(port, host)
}

const router = (info, res) => {
  if (info.path.indexOf('/static/') === 0) {
    serveStaticFile(info.path, res)
  } else {
    let
      urlParts = info.path.split('/')
    , route    = (urlParts[1]) ? urlParts[1] : 'start'
    , action   = (urlParts[2]) ? urlParts[2] : 'handle'

    if (urlParts.length > 3) { // params
      info.params = urlParts.slice(3, urlParts.length)
    }

    fs.exists(path.join(routesDir, route + '.js'), exists => {
      if (exists) { // check if there's a route file
        let handler = require(path.join(routesDir, route))

        if (typeof handler[action] === 'function') {
          handler[action](info, res) // if handler exists, call it
        } else {
          notFound(res)
        }
      } else {
        notFound(res)
      }
    })
  }
}

const serveStaticFile = (pathname, res) => {
  let file = path.join(baseDir, pathname)

  fs.exists(file, exists => {
    if (exists) {             // the file
      fs.stat(file, (stat_err, stats) => {
        if (stats.isFile()) { // is it, in fact, a file?
          res.writeHead(200)
          fs.createReadStream(file).pipe(res)
        } else {              // if it's not a file
          notFound(res)
        }
      })
    } else { // nothing there!
      notFound(res)
    }
  })
}

const notFound = res => {
  res.writeHead(404)
  res.end('Not Found')
}

exports.start = start

