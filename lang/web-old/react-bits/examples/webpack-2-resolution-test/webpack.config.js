const path = require('path')
module.exports =  {
  output: {
    filename: 'bundle.js'
  },
  entry: './index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      }
    ]
  },
  resolve: {
    modules: [
      // this also worked
      // path.resolve(__dirname, 'Components'),
      'node_modules'
    ],
    // this works
    alias: {
      Dashboard: path.resolve(__dirname, 'Components/Dashboard')
    },
    extensions: ['.js']
  }
}
