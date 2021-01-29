// adapted from the strip-copyright code that facebook uses

const
  fs    = require('fs')
, arg   = process.argv[2] || null
, strip = source => {
  const toStrip  = getToStrip()
  const position = source.indexOf(toStrip)
  if (position === -1) {
    return source
  }
  return source.slice(0, position) + source.slice(position + toStrip.length)
}

let _toStrip
const getToStrip = () => _toStrip|| (_toStrip = fs.readFileSync(arg))

module.exports = stripCopyright

