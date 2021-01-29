module.exports = {
  entry  : ['./src/index.js']
, output : {
    path     : './dist'
  , filename : 'bundle.js'
  }
, resolve : {
    modulesDirectories : ['node_modules', 'src']
  , extensions         : ['', '.js', '.jsx']
  }
, module : {
    loaders : [
      {
        loader  : ['babel']
      , exclude : /node_modules/
      , test    : /\.jsx?$/
      , query   : {
          presets : ['react', 'es2015']
        }
      }
    ]
  }
}
