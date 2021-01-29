const { readFileSync } = require('fs')
const t = readFileSync('/usr/local/lib/node_modules/browserify-adventure/problems/using_transforms/wake.txt', 'utf8')
const s = require('sprintf')
const l = t.split('\n')
const log = console.log

l.forEach((li, ix) => {
  if (ix % 5 === 0) {
    log(s('%3d %s', ix, li))
  } else {
    log(`    ${li}`)
  }
})
