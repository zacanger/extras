#!/usr/bin/env node

var spawn = require('child_process').spawn
  , args  = ['-r', '.']
args = args.concat(process.argv.slice(2))
spawn('./node_modules/.bin/nwbuild', args, {cwd: __dirname, stdio: [0, 1, 2]})

