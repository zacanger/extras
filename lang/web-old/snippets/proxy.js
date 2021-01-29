const http = require('http')
const fs = require('fs')
const port = process.env.PROXY_PORT || 9999

let blacklist = []
let iplist = []

fs.watchFile('./blacklist', updateBlacklist)
fs.watchFile('./iplist', updateIplist)

const updateBlacklist = () => {
  fs.stat('./blacklist', (err, stats) => {
    if (err) throw err
    blacklist = fs.readFileSync('./blacklist').split('\n')
      .filter((rx) => rx.length)
      .map((rx) => RegExp(rx))
  })
}

const updateIplist = () => {
  fs.stat('./iplist', (err, stats) => {
    if (err) throw err
    iplist = fs.readFileSync('./iplist').split('\n')
      .filter((rx) => rx.length)
  })
}

const ipAllowed = (ip) => {
  for (let i in iplist) {
    if (iplist[i] == ip) {
      return true
    }
  }
  return false
}

const hostAllowed = (host) => {
  for (let i in blacklist) {
    if (blacklist[i].test(host)) {
      return false
    }
  }
  return true
}

const deny = (response, msg) => {
  response.writeHead(401)
  response.write(msg)
  response.end()
}

http.createServer((request, response) => {
  const ip = request.connection.remoteAddress
  if (!ipAllowed (ip)) {
    const msg = `IP ${ip} is not allowed to use this proxy.`
    deny(response, msg)
    console.log(msg)
    return
  }

  if (!hostAllowed(request.url)) {
    const msg = `Host ${request.url} has been denied by proxy configuration.`
    deny(response, msg)
    console.log(msg)
    return
  }

  console.log(`${ip}: ${request.method} ${request.url}`)
  const proxy = http.createClient(80, request.headers['host'])
  const proxyRequest = proxy.request(request.method, request.url, request.headers)
  proxyRequest.addListener('response', (proxyResponse) => {
    proxyResponse.addListener('data', (chunk) => {
      response.write(chunk, 'binary')
    })
    proxyResponse.addListener('end', () => {
      response.end()
    })
    response.writeHead(proxyResponse.statusCode, proxyResponse.headers)
  })
  request.addListener('data', (chunk) => {
    proxyRequest.write(chunk, 'binary')
  })
  request.addListener('end', () => {
    proxyRequest.end()
  })
}).listen(port)

update_blacklist()
update_iplist()
