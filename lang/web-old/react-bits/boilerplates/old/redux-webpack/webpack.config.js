const
  path    = require('path')
, webpack = require('webpack')

module.exports = {
  watch   : true
, devtool : 'cheap-module-eval-source-map'
, entry   : './index'
, output  : {
    path     : './build'
  , filename : 'bundle.js'
  }
, plugins : [
    new webpack.optimizeOccurenceOrderPlugin()
  , new webpack.NoErrorsPlugin()
]
, module : {
    loaders : [{
      test    : /\.js$/
    , loaders : ['babel']
    , exclude : /node_modules/
    }]
  }
}

