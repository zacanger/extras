var os = require('os')
	, intf = process.argv[2]

console.log(os.networkInterfaces()[intf][0].mac)


