// GET /
// retrive list of keys
//
// GET /[url]
// retrive object stored at [url]
// will respond with 404 if there is nothing stored at [url]
//
// POST /[url]
//
// JSON.parse the body and store it under [url]
// will respond 400 (bad request) if body is not valid json.

class Store {
  constructor () {
    this.store = {}
  }

  get (key) {
    return this.store[key]
  }

  set (key, val) {
    this.store[key] = value
  }

  handler () {
    const store = this
    return (req, res) => {
      const send = (obj, status) => {
        res.writeHead(200 || status, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(obj) + '\n')
        res.end()
      }
      const url = req.url.split('?').shift()
      if (url === '/') {
        return send(Object.keys(store.store))
      } else if (req.method == 'GET') {
        const obj = store.get(url)
        send(obj || { error: 'not_found', url: url }, obj ? 200 : 404)
      } else {
        let body = ''
        let obj
        req.on('data', (c) => { body += c})
        req.on('end', (c) => {
          try {
            obj = JSON.parse(body)
          } catch (err) {
            return send (err, 400)
          }
          store.set(url, obj)
          send({ ok: true })
        })
      }
    }
  }
}
