const
  express              = require('express')
, webpackDevMiddleware = require('webpack-dev-middleware')
, webpackHotMiddleware = require('webpack-hot-middleware')
, webpack              = require('webpack')
, webpackConfig        = require('./webpack.config.js')
, app                  = express()
, compiler             = webpack(webpackConfig)
, port                 = process.env.PORT || 3000

app
.use(express.static(__dirname + '/www'))
.use(webpackDevMiddleware(compiler, {
  hot: true
, filename: 'bundle.js'
, publicPath: '/'
, stats: { colors : true }
, historyApiFallback: true
}))
.use(webpackHotMiddleware(compiler, {
  log: console.log
, path: '/__webpack_hmr'
, heartbeat: 10 * 1000
}))
.listen(port, () => console.log(`listening on ${port}`))
