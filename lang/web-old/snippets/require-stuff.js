import fs   from 'fs'
import path from 'path'

export default function asdf (file) {
  const
    reqFrom = path.dirname(module.parent.filename)
  , absPath = path.resolve(reqFrom, file)
  return fs.readFileSync(absPath).toString()
}

// usage:
const
  foo      = require('this-file')
, bar      = foo('some.html')
, whatever = `<html>${bar}</html>`
