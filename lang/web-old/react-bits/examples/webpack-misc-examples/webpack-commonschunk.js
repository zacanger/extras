const
  path    = require('path')
, webpack = require('webpack')

module.exports = {
  entry: {
    namedEntryPoint : ['./something']
  , anotherEntryPt  : ['./somewhere']
  , theTestingStuff : ['./testpackbincode']
  , iDontKnow       : './app/'
  }
, output : {
    path     : path.join(__dirname, 'dist')
  , filename : '[name].js'
  }
, plugins : [
    new webpack.optimize.CommonsChunkPlugin({
      names     : ['namedEntryPoint', 'anotherEntryPt', 'theTestingStuff']
    , minChunks : Infinity
    })
  ]
}

