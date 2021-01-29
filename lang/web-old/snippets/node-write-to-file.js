const fs = require('fs')

fs.writeFile('outputFile.extension', 'this is stuff\n', function(err){
  if(err){
    console.error(err)
  }
})

fs.appendFile('outputFile.extension', 'this is another line yay\n', function(err){
  if(err){
    console.error(err)
  }
})

for(var i = 0; i < 1000; i++){
  fs.appendFileSync('outputFile.extension', 'another line ' + i + '\n')
}

