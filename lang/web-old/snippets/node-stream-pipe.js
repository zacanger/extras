const
  child  = require('child_process')
, fooRep = child.spawn('node')
, out    = process.stdout
, sin    = process.stdin

fooRep.stdout.pipe(out, {end : false})
sin.resume()
sin.pipe(fooRep.stdin, {end : false})

fooRep.stdin.on('end', () => {
  out.write('ended stream')
})

fooRep.on('exit', (code) => {
  process.exit(code)
})
