const
  path    = require('path')
, webpack = require('webpack')

module.exports = {
  entry  : './src/index.js'
, output : {
    path     : __dirname
  , filename : 'bundle.js'
  }
, module : {
    loaders  : [
      {
        loader : 'babel-loader'
      , test   : path.join(__dirname, 'src')
      , query  : {
          presets : 'es2017'
        }
      }
    ]
  }
, plugins : [
    new webpack.NoErrorsPlugin()
  ]
, stats   : {
    colors : true
  }
, devtool : 'cheap-module-eval-source-map'
}
