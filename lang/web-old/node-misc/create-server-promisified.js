const http = require('http')
const { promisify } = require('util')

/**
 * taken from r2's tests because it's a good idea
 * const s = createServer(async (req, res) => {
 *   // do stuff, i guess
 * })
 * await s.listen(port)
 * // do more stuff, i guess
 * await s.close()
 */

module.exports = (handler) => {
  let server = http.createServer(handler)
  server._close = server.close
  server.close = promisify((cb) => server._close(cb))
  server._listen = server.listen
  server.listen = promisify((port, cb) => server._listen(port, cb))
  return server
}
