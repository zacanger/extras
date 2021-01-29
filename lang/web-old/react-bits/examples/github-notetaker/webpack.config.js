module.exports = {
  entry  : './app/Index.jsx'
, output : {
    filename : 'public/bundle.js'
  }
, module : {
    loaders : [{
      test    : /\.jsx?$/
    , exclude : /(node_modules|bower_components)/
    , loader  : 'babel'
    , query   : {
        presets : ['react', 'es2017']
      }
    }]
  }
}

