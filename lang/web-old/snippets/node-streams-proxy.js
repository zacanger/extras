var http = require('http')

http.createServer(function(request, response){
  var proxy        = http.createClient(9876, 'localhost')
    , proxyRequest = proxy.request(request.method, request.url, request.headers)
  proxyRequest.on('response', function(proxyResponse){
    proxyResponse.pipe(response)
  })
  request.pipe(proxyRequest)
}).listen(6789)

http.createServer(function(req, res){
  res.writeHead(200, {'Content-Type':'text/plain'})
  res.write('request proxied to 9876\n' + JSON.stringify(req.headers, true, 2))
  res.end()
}).listen(9876)

