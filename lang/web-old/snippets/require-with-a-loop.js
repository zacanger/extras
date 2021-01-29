// instead of a bunch of foo = require("foo")
// list our required modules and loop through

const r = [
  'fs'
, 'os'
, 'net'
, 'util'
, 'http'
// etc
]

for (let i = 0; i < r.length; i++) {
  global[r[i]] = require(r[i])
}
