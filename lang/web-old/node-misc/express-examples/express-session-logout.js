// this should be a basically complete logout using .destroy()
app.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.trace(err)
    } else {
      res.redirect('/')
    }
  })
})

// .destroy() is a wrapper for delete req.session
app.get('/logout', function(req, res){
  delete this.req.session
  this.req.sessionStore.destroy(this.id)
  return this
})

// all the different ways i've seen to get rid of a session
// req.session = null
// req.session = {}
// req.logout()
// res.redirect('/')
// res.clearCookie('connect.sid', {path : '/'})

