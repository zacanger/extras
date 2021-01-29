const
  url = require('url')
, qs  = require('querystring')
, a   = prompt()
, q   = url.parse(a).query
, p   = qs.parse(q)
console.log(url.resolve(a, p.file))
