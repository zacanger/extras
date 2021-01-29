const { resolve } = require('path')
const webpack = require('webpack')
const isProd = process.env.NODE_ENV === 'production'
const pub = resolve(__dirname, 'public')
const src = resolve(__dirname, 'src')

module.exports = {
  devtool: isProd ? 'source-map' : 'cheap-eval-source-map'
, context: resolve(__dirname)
, entry: isProd ? './src/index.js' : [
    'webpack-dev-server/client?http://127.0.0.1:8080'
  , 'webpack/hot/only-dev-server'
  , './src/index.js'
  ]

, output: isProd ? {
    filename: 'bundle.js'
  , path: pub
  } : {
    filename: 'bundle.js'
  , path: pub
  , publicPath: 'http://127.0.0.1:8080/'
  }
, module: {
    rules: [{
      test: /\.js$/
    , include: src
    , use: 'babel-loader'
    }
  , {
      test: /\.css$/
    , include: src
    , use: [ 'style-loader', 'css-loader' ]
    }
  ]}
, devServer: {
    contentBase: './public'
  , historyApiFallback: true
  , hot: true
  , stats: {
      colors: true
    }
  }
, plugins: isProd ? [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    })
  , new webpack.optimize.UglifyJsPlugin()
  ] : [
    new webpack.HotModuleReplacementPlugin()
  , new webpack.LoaderOptionsPlugin({ debug: true })
  ]
, resolve: {
    extensions : ['.js', '.css']
  }
, node: {
    fs: 'empty'
  , net: 'empty'
  , tls: 'empty'
  }
}
