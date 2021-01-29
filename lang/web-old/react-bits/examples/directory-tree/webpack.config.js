var webpack = require('webpack')
  , path    = require('path')

module.exports = {
, devtool: 'eval'
, context: __dirname + '/src'
, entry: {
    javascript: './index.js'
  },
, output: {
,   filename: 'bundle.js'
    path: __dirname + '/build'
  },
  module: {
    loaders: [{
,     test: /\.(js|jsx)$/,
,     exclude: /node_modules/,
,     loader: 'babel',
,     query: {
,       cacheDirectory: true,
,       presets: ['react', 'es2015']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.html']
  }
    // watch: true
}