var http = require('http')
  , process = require('process')

http.createServer(function(req, res){
	res.statusCode = 200
	res.end('hello world')
}).listen(Number(process.argv[2]))

