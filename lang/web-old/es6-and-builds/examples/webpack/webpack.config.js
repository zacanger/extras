const
  webpack           = require('webpack')
, ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry  : './index'
, output : {
    path       : './build'
  , publicPath : '/build/'
  , filename   : 'bundle.js'
  }
, plugins : [
    new ExtractTextPlugin('styles.css')
  ]
, devtool : 'cheap-module-eval-source-map'
, module  : {
    loaders : [
      {
        test    : /\.(png|jpg)$/
      , exclude : /node_modules/
      , loader  : 'url-loader?limit=800'
      }
    , {
        test    : /\.css$/
      , exclude : /node_modules/
      , loader  : ExtractTextPlugin.extract('style-loader', 'css-loader')
      }
    , {
        test    : /\.js$/
      , exclude : /node_modules/
      , loader  : 'babel-loader'
      }
    , {
        test    : /\.html$/
      , exclude : /node_modules/
      , loader  : 'html-loader'
      }]
  }
, resolve : {
    extensions : ['', '.js']
  }
}
