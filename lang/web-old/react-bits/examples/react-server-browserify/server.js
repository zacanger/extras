const
  http           = require('http')
, browserify     = require('browserify')
, literalify     = require('literalify')
, React          = require('react')
, ReactDOMServer = require('react-dom/server')
, DOM            = React.DOM
, body           = DOM.body
, div            = DOM.div
, script         = DOM.script
, App            = React.createFactory(require('./App'))
, port           = process.env.PORT || 3000

http.createServer((req, res) => {

  if (req.url == '/') {
    res.setHeader('Content-Type', 'text/html')

    const props = {
      items : [
        'Item 0'
      , 'Item 1'
      , 'Item </script>'
      , 'Item <!--inject!-->'
      ]
    }

    const html = ReactDOMServer.renderToStaticMarkup(body(
      null

    , div({id : 'content', dangerouslySetInnerHTML: {__html:
        ReactDOMServer.renderToString(App(props))
      }})

    , script({dangerouslySetInnerHTML: {__html:
        'var APP_PROPS = ' + safeStringify(props) + ';'
      }})

    , script({src : '//cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react.min.js'})
    , script({src : '//cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react-dom.min.js'})
      script({src : '/bundle.js'})
    ))

    res.end(html)

  } else if (req.url == '/bundle.js') {
    res.setHeader('Content-Type', 'text/javascript')
    browserify()
    .add('./browser.js')
    .transform(literalify.configure({
      'react'     : 'window.React'
    , 'react-dom' : 'window.ReactDOM'
    }))
    .bundle()
    .pipe(res)
  } else {
    res.statusCode = 404
    res.end()
  }

}).listen(port, err => {
  if (err) {
    throw err
  }
  console.log(`listening on ${port}`)
})

const safeStringify = obj => (
  JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
)

