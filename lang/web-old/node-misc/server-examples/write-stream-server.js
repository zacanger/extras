var http = require('http')
  , fs   = require('fs')
  , port = 8765

http.createServer(function(req, res){
  var writeStream = fs.createWriteStream('./written')
  req.pipe(writeStream)
  req.on('end', function(){
    res.writeHead(200, {'content-type':'text/html'})
    res.end('<form method="POST"><input name="test"><input type="submit"></form>')
  })
  writeStream.on('error', function(err){
    console.log('error!', err)
  })
}).listen(port)
console.log('writing on', port)
