const n = require('./ndjson')

console.log(n.parse(prompt()))
console.log(n.stringify(prompt()))
