function readFile(input){
  var
    fs        = require('fs')
  , readline  = require('readline')
  , instream  = fs.createReadStream(input)
  , outstream = new (require('stream'))()
  , rl        = readline.createInterface(instream, outstream)

  rl.on('line', function(line){
    console.log(line)
  })

  rl.on('close', function(line){
    console.log(line)
    console.log('done')
  })
}
readFile(process.argv[2])

// or, reading an entire file (utf-8 assumed):
fs.readFile(process.argv[2], 'utf8', function(err, data){
  if(err){
    throw err
  }
  console.log(data)
})

