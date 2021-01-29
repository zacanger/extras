'use strict'

const
  http = require('http')
, url  = require('url')
, fs   = require('fs')
, port = process.argv[2] || process.env.PORT || 3000

http.createServer((req, res) => {
  let query = url.parse(req.url, true).query

  if(typeof query.file === 'undefined'){
    res.setHeader('Content-disposition', 'attachment; filename=default.document')
    res.setHeader('Content-type', 'text/plain')
    res.end('You didn\'t enter a file-name; here\'s one anyway!')
  } else {
    fs.readFile('/path/to/downloadable/files/' + query.file, (err, content) => {
      if(err){
        res.writeHead(400, {'Content-type:' 'text/html'})
        console.error(err)
        res.send('No such file')
      } else {
        res.setHeader('Content-disposition', 'attachment; filename=' + query.file)
        res.end(content)
      }
    })
  }
}).listen(port)

console.log('listening on ' + port)

