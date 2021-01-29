// just an example of how one might deal with a json file in node

const
  fs     = require('fs')
, parsed = (JSON.parse(fs.readFileSync('./some.json', 'utf8')))

console.log(parsed)
console.log(parsed.key)
console.log(parsed.key.anotherkey)

