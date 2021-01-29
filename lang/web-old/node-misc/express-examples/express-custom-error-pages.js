// this is pretty simple. assuming you've already got everything installed
// and set up, and you're using jade (which is express's default view engine).
// these would go after loading all middleware, and before routing (so, no
// handling errors in the routes, yay).

app.use((req, res) => {
  res.status(400)
  res.render('./views/404.jade', {title : '404: Not Found'})
})

app.use((error, req, res, next) => {
  res.status(500)
  res.render('./views/500.jade', {title : '500: Internal Server Error', error : error})
})
