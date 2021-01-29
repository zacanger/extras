#!/usr/bin/env node

// assumes out files go in /lib
// assumes a package.main and package.module
// assumes only one default export
// adapted from https://github.com/lukeed/tinydate

const fs = require('fs')
const { resolve } = require('path')
const pkg = require('./package')
const lib = resolve('lib')
const entry = resolve('src/index.js')

if (!fs.existsSync(lib)) {
  fs.mkdirSync(lib)
}

fs.readFile(entry, (_, buf) => {
  fs.writeFile(resolve(pkg.module), buf)
  fs.writeFile(resolve(pkg.main), buf.toString().replace('export default', 'module.exports ='))
})
