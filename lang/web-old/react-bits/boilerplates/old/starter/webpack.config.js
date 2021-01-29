const
  path    = require('path')
, webpack = require('webpack')
, here    = path.resolve(__dirname)

module.exports = {
  devtool : 'cheap-eval-source-map'
, context : here
, debug   : true
, entry   : [
    'webpack-dev-server/client?http://127.0.0.1:8080'
  , 'webpack/hot/only-dev-server'
  , './src/index.jsx'
  ]
, output : {
    filename          : 'bundle.js'
  , path              : './public'
  , publicPath        : 'http://127.0.0.1:8080/'
  }
, module : {
    loaders : [{
      test          : /\.jsx$/
    , include       : path.resolve(__dirname, 'src')
    , loaders       : ['react-hot', 'babel']
    }
  , {
      test          : /\.less$/
    , include       : path.resolve(__dirname, 'src')
    , loader        : 'style!css!less'
    }
  ]}
, devServer : {
    contentBase        : './public'
  , historyApiFallback : true
  , hot                : true
  , stats              : {
      colors : true
    }
  }
, plugins : [
    new webpack.HotModuleReplacementPlugin()
  ]
, resolve : {
    extensions : ['', '.js', '.jsx', '.less']
  }
}

