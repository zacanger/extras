const parse = s => s.split('\n').map(JSON.parse)
const stringify = r => r.map(JSON.stringify).join('\n')

module.exports = { parse, stringify }
