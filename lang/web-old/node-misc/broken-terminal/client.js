
var client = {}

var Terminal = require('term.js')
client.run = function(options){
	options = options || {}
	var socket = io.connect(options.remote || "http://localhost:9090")
	socket.on('connect', function(){
		var term = new Terminal({
      cols       : 120
    , rows       : 60
    , useStyle   : true
    , screenKeys : true
		})
		term.on('data', function(data){
			socket.emit('data', data)
		})
		socket.on('data', function(data){
			term.write(data)
		})
		term.open(options.parent || document.body)
		term.write('WELCOME!\r\n')
		socket.on('disconnect', function(){
			term.destroy()
		})
		// for displaying the first command line
		socket.emit('data', '\n')
	})
}
