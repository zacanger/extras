var events = require('events')
	, http = require('http')
	, server = http.createServer(function(req, res){})

console.log(events.listenerCount(server, 'request'))
