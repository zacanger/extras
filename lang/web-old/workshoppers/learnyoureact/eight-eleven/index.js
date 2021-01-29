const
  React          = require('react')
, ReactDOMServer = require('react-dom/server')
, DOM            = React.DOM
, body           = DOM.body
, div            = DOM.div
, script         = DOM.script
, browserify     = require('browserify')
, babelify       = require('babelify')
, express        = require('express')
, app            = express()
, port           = process.argv[2] || 3000
, reactViews     = require('express-react-views')
, TodoBox        = require('./components')
, data           = [
  {title : 'Shopping', detail : process.argv[3]}
, {title : 'Hair cut', detail : process.argv[4]}
]

app
.set('port', port)
.set('view engine', 'jsx')
.set('views', __dirname + '/views')
.engine('jsx', reactViews.createEngine({transformViews : false}))

require('babel/register')({ignore : false})

app
.use('/bundle.js', (req, res) => {
  res.setHeader('content-type', 'application/javascript')

  browserify({debug : true})
  .transform(babelify.configure({
    presets : ['react', 'es2015']
  , compact : false
  }))
  .require('isomorphic/solution/app.js', {entry : true})
  .bundle()
  .pipe(res)
})

.use('/', (req, res) => {
  const
  , initialData = JSON.stringify(data)
  , markup = ReactDOMServer.renderToString(React.createElement(TodoBox, {data : data}))

  res.setHeader('Content-Type', 'text/html')

  const html = ReactDOMServer.renderToStaticMarkup(body(null,
    div({id : 'app', dangerouslySetInnerHTML : {__html : markup}})
  , script({
      id          : 'initial-data'
    , type        : 'text/plain'
    , 'data-json' : initialData
    })
  , script({src : '/bundle.js'})
  ))

  res.end(html)
})

.listen(port, () => console.log(`listening on ${port}`))
