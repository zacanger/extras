var http = require('http')
  , fs   = require('fs')
  , port = 5678

http.createServer(function(req, res){
  var filename   = __dirname+req.url
    , readStream = fs.createReadStream(filename)
  readStream.on('open', function(){
    readStream.pipe(res)
  })
  readStream.on('error', function(err){
    res.end(err)
  })
}).listen(port)
console.log('listening on', port)
