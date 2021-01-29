var http = require('http')
http.createServer(function(req, res){
	res.statusMessage = 'Nope'
	res.end()
}).listen(+process.argv[2])
