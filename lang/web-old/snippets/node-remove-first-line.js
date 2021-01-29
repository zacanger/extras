const
  Transform = require('stream').Transform
, util      = require('util')

function RemoveFirstLine(args) {
  if (!(this instanceof RemoveFirstLine)) {
    return new RemoveFirstLine(args)
  }
  Transform.call(this, args)
  this._buff    = ''
  this._removed = false
}

util.inherits(RemoveFirstLine, Transform)

RemoveFirstLine.prototype._transform = function(chunk, encoding, done) {
  if (this._removed) {
    this.push(chunk)
  } else {
    this._buff += chunk.toString()
    if (this._buff.indexOf('\n') !== -1) {
      this.push(this._buff.slice(this._buff.indexOf('\n') + 2))
      this._buff = null
      this._removed = true
    }
  }
  done()
}

// usage:
const
  fs     = require('fs')
, input  = fs.createReadStream('test')
, output = fs.createWriteStream('_test')

input.pipe(RemoveFirstLine().pipe(output))

// if you're working with small files, this works by loading into memory.
const
  fs       = require('fs')
, filePath = './test'


fs.readFile(filePath, (err, data) => {
  if (!err) {
    data = data.toString()
    var position = data.toString().indexOf('\n')
    if (position != -1) {
      data = data.substr(position + 1)
      fs.writeFile(filePath, data, (err) => {
        if (err) {
          console.log (err)
        }
      })
    } else {
      console.log('no lines found')
    }
  } else {
    console.log(err)
  }
})

