module.exports = {
  entry  : ['./src/index.js']
, output : {
    path     : __dirname + '/dist'
  , filename : 'bundle.js'
  }
, resolve : {
    modulesDirectories : ['node_modules', 'src']
  , extensions         : ['', '.js', '.jsx', '.scss']
  }
, module : {
    loaders : [
      {
        test    : /\.jsx?$/
      , loader  : ['babel']
      , exclude : /node_modules/
      , query   : {
          presets : ['react', 'es2015']
        }
      }
    , {
        test : /\.scss$/
      , loader : 'style!css!sass'
      }
    ]
  }
}
