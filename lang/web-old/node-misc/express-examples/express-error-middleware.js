// try returning something like
// return res.json({ status : 'OK', result : something }) // or
// return res.json({ status : 'error', message : err })

app.use((req, res) => res.send('<h1>404!</h1>'))

app.get('/foo/:id', (req, res, next) => {
  Something.findById(req.params.id).exec()
  .then(x => {
    if (x === null) {
      return next() // 404
    }
    return res.send(`found ${req.params.id}`)
  })
  .then(null, err => next(err))
})

app.use((err, req, res) => {
  switch (err.name) {
    case 'CastError':
      res.status(400)
      return res.send('400')
      break
    default:
      res.status(500)
      return res.send('500')
      break
  }
})

