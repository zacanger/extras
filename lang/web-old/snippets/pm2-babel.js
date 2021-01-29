'use strict'

// you'll need to `npm i -g babel pm2` first

const
  http    = require('http')
, fs      = require('fs')
, port    = process.argv[3] || process.env.PORT || 3000
, serveMe = process.argv[2] || null
, server  = http.createServer((req, res) => {
  fs.readFile(serveMe, (err, data) => {
    if(err){
      console.error('error reading the file!', err)
    }
    res.send(data)
  })
})

server.listen(port)

console.log('server running on ' + port)

// now, you'll need a pm2.json (or whatever) file, structured like so:
// {
//   "apps" : [{
//     "name"             : "someName"
//   , "script"           : "pm2-babel.js"
//   , "watch"            : true
//   , "exec_interpreter" : "babel-node"
//   , "exec_mode"        : "fork"
//   }]
// }
// and you can start that with `pm2 start pm2.json`
// some other pm2 things:
// `pm2 start someName`
// `pm2 list`
// `pm2 restart name/id/all`
// `pm2 delete name/id/all`
