const promisifyMiddlware = (middleware) =>
  (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (err) =>
        err ? reject(err) : resolve()
      )
    })

module.exports = promisifyMiddlware
