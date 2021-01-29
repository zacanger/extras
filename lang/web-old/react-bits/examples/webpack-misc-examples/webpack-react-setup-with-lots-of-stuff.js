// basic setup for some webpack bizniz

// webpack.config.js
const
  path    = require('path')
, webpack = require('webpack')

module.exports = {
  devtool : 'eval-source-map'
, entry   : {
    main  : [
      'webpack-dev-server/client?http://localhost:8080'
    , 'webpack/hot/only-dev-server'
    , './src/main.js'
    ]
  }
, output       : {
    filename   : '[name].js'
  , path       : path.join(__dirname, 'public')
  , publicPath : '/public/'
  }
, plugins : [
    new webpack.HotModuleReplacementPlugin()
  , new webpack.NoErrorsPlugin()
  ]
, module    : {
    loaders : [
      {
        test    : /\.jsx?$/
      , include : path.join(__dirname, 'src')
      , loader  : 'react-hot!babel'
      }
    , {
        test    : /\.less$/
      , include : path.join(__dirname, 'src')
      , loader  : 'style!css!less'
      }
    ]
  }
}


// server.js
const
  webpack          = require('webpack')
, WebPackDevServer = require('webpack-dev-server')
, config           = require('./webpack.config')

new WebPackDevServer(webpack(config), {
  publicPath         : config.output.publicPath
, hot                : true
, historyApiFallback : true
}).listen(8080, 'localhost')

// package.json
// {
//   "name": "setup",
//   "version": "0.1.0",
//   "description": "stuff",
//   "main": "index.js",
//   "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1"
//   },
//   "author": "",
//   "license": "WTFPL",
//   "dependencies": {
//     "alt": "0.17.1",
//     "babel-core": "5.8.14",
//     "babel-loader": "5.3.2",
//     "css-loader": "0.15.6",
//     "firebase": "2.2.9",
//     "less": "^2.5.3",
//     "less-loader": "^2.2.2",
//     "lodash": "3.10.1",
//     "material-ui": "0.10.2",
//     "react": "0.13.3",
//     "react-hot-loader": "1.2.8",
//     "react-router": "0.13.3",
//     "react-tap-event-plugin": "0.1.7",
//     "style-loader": "0.12.3",
//     "trim": "0.0.1",
//     "webpack": "1.10.5",
//     "webpack-dev-server": "1.10.1"
//   }
// }
//
