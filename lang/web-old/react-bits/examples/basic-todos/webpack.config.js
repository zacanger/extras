module.exports = {
  entry: './src/App.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [ '', '.js' ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: [ 'react', 'latest' ]
        }
      }
    ]
  }
}
