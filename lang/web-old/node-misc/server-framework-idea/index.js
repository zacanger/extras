const http = require('http')
const members = require('./members')
const port = process.env.PORT || 9999

const lower = (s) => s.toLowerCase()

const routing = {
  '/': 'hello',
  '/members': JSON.stringify(members, null, 2) + '\n',
  '/members/colors': () => members.map(({ color }) => color) + '\n',
  '/member/*': (_, param) => JSON.stringify(members.find((m) => lower(m.name) === lower(param[0])), null, 2) + '\n'
}

const types = {
  object: JSON.stringify,
  string: (s) => s,
  number: (n) => n + '',
  undefined: () => 'not found',
  function: (fn, par, client) => fn(client, par)
}

const matching = []

for (const key in routing) {
  if (key.includes('*')) {
    const rx = new RegExp(key.replace('*', '(.*)'))
    const route = routing[key]
    matching.push([rx, route])
    delete routing[key]
  }
}

const router = (client) => {
  let rx
  let par
  let route = routing[client.req.url]
  if (route === undefined) {
    for (let i = 0, len = matching.length; i < len; i++) {
      rx = matching[i]
      par = client.req.url.match(rx[0])
      if (par) {
        par.shift()
        route = rx[1]
        break
      }
    }
  }
  const type = typeof route
  const renderer = types[type]
  return renderer(route, par, client)
}

http.createServer((req, res) => {
  res.end(router({ req, res }) + '')
}).listen(port, () => {
  console.log(`listening on ${port}`)
})
