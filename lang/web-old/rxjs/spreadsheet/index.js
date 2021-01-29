#!/usr/bin/env node
require('http').createServer((req, res)=>{require('fs').createReadStream(require('path').resolve(__dirname,'index.html')).pipe(res)}).listen(4444)
