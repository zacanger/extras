module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
