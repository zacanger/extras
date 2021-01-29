'use strict'

const
  fs      = require('fs')
, glob    = require('glob').sync
, mkdirp  = require('mkdirp').sync
, sass    = require('node-sass')
, path    = require('path')
, streams = require('stream')
, runner  = {}

// glob from source
runner.src = globStr => {
  const
    fileQueue = glob(globStr)
  , rs        = streams.Readable({objectMode : true})
  rs._read = () => {
    const file = fileQueue.shift()
    if (file) {
      this.push({
        filename : file
      , contents : fs.readFileSync(file, {encoding : 'utf8'})
      })
    }
  }
  return rs
}

// save to dest
runner.dest = basePath => {
  const ws = streams.Writable({objectMode : true})
  ws._write = file => {
    mkdirp(path.dirname(basePath + file.filename))
    fs.writeFileSync(basePath + file.filename, file.contents)
  }
  return ws
}

// example sass plugin
const compileSass = () => {
  const ts = streams.Transform({objectMode : true})
  ts._transform = file => {
    sass.render({data : file.contents}, (err, result) => {
      file.filename = file.filename.replace(/\.scss$/, '.css')
      file.contents = result.css.toString()
      this.push(file)
    })
  }
  return ts
}

// usage
runner.src('scss/*.scss')
.pipe(compileSass())
.pipe(runner.dest('css/'))

