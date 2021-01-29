const
  webpack = require('webpack')
, path    = require('path')

module.exports = {
  entry  : './src/index.tsx'
, output : {
    path : path.resolve(__dirname, 'dist')
  , filename : 'bundle.js'
  }
  , resolve : {
    extensions : ['', '.ts', '.js', '.tsx', '.jsx']
  }
  , module  : {
    loaders : [
      {
        test    : /\.tsx$/
      , loader  : 'ts-loader'
      , exclude : /node_modules/}
    ]
  }
}

