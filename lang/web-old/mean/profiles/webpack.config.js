module.exports = {
  entry : [
    './src/index.js'
  ]
  , module  : {
      loaders : [
      {
        test      : /\.js/
      , exclude : /node_modules/
      , loader  : 'babel'
      }
    , {
        test: /\.css$/
      , exclude: /node_modules/
      , loader: 'style!css'
      }
    , {
        test: /\.html$/
      , loader: 'html'
      }
      ]
    }
  , resolve : {
      extensions : ['', '.js']
    }
  , output : {
      path       : __dirname + '/dist'
    , publicPath : '/'
    , filename   : 'bundle.js'
  }
  , devServer : {
      contentBase : './dist'
  }
}

