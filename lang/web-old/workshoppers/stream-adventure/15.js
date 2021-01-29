const { createHash, createDecipher } = require('crypto')
const tar = require('tar')
const { createGunzip } = require('zlib')
const concat = require('concat-stream')
const p = tar.Parse()
p.on('entry', e => {
  if (e.type !== 'File') {
    return
  }
  const h = createHash('md5', {encoding: 'hex'})
  e.pipe(h).pipe(concat((a) => {
    console.log(`${a} ${e.path}`)
  }))
})
const c = process.argv[2]
const w = process.argv[3]
process.stdin.pipe(createDecipher(c, w)).pipe(createGunzip()).pipe(p)
