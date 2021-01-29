const
  { join } = require('path')
, webpack  = require('webpack')

module.exports = {
  devtool : 'cheap-module-eval'
, entry : [
    'webpack-dev-server/client?http://localhost:4444'
  , 'webpack/hot/only-dev-server'
  , './src/index.js'
  ]
, output : {
    path       : './'
  , filename   : 'bundle.js'
  , publicPath : './'
  }
, plugins : [
    new webpack.HotModuleReplacementPlugin()
  ]
, module : {
    loaders : [{
      test    : /\.js$/
    , loaders : ['react-hot', 'babel']
    , include : join(__dirname, 'src')
    }]
  }
}
