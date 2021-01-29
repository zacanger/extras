var child  = require('child_process')
  , fs     = require('fs')
  , fooRep = child.spawn('node')
  , aFile  = fs.createWriteStream('wrote.md')

fooRep.stdout.pipe(process.stdout, {end:false})
fooRep.stdout.pipe(aFile)
process.stdin.resume()
process.stdin.pipe(fooRep.stdin, {end:false})
process.stdin.pipe(aFile)

fooRep.stdin.on('end', function(){
  process.stdout.write('stream ended')
})

fooRep.on('exit', function(code){
  process.exit(code)
})

