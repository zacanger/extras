const
  path    = require('path')
, webpack = require('webpack')

module.exports = {
  context : path.join(__dirname, 'src')
, entry   : [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
  , './main.js'
  ]
, output : {
    path     : path.join(__dirname, 'www')
  , filename : 'bundle.js'
  }
, module : {
    loaders : [
      {
        test    : /\.js$/
      , exclude : /node_modules/
      , loaders : ['react-hot', 'babel']
      }
    ]
  }
, resolveLoader : {
    root : [
      path.join(__dirname, 'node_modules')
    ]
  }
, resolve : {
    root : [
      path.join(__dirname, 'node_modules')
    ]
  }
, plugins : [
    new webpack.optimize.OccurenceOrderPlugin()
  , new webpack.HotModuleReplacementPlugin()
  , new webpack.NoErrorsPlugin()
  ]
}
