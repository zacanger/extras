const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const config = require('./webpack.config.js')

const host = '127.0.0.1'
const port = 3001

new WebpackDevServer(webpack(config), {
  hot: true,
  contentBase: './public',
  watchOptions: { ignored: /node_modules/ },
  stats: { colors: true },
  historyApiFallback: true
}).listen(port, host, (err) => {
  if (err) console.warn(err)
  console.log(`listening on ${port}`)
})
