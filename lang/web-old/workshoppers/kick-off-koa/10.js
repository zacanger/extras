const
  koa    = require('koa')
, app    = koa()
, views  = require('co-views')
, p      = process.argv[2]
, render = views(__dirname, {ext : 'ejs'})
, user   = {
  name : {
    first : 'Tobi'
  , last  : 'Holowaychuk'
  }
, species : 'ferret'
, age     : 3
}

app.use(function * () {
  this.body = yield render('10', {user : user})
}).listen(p)
