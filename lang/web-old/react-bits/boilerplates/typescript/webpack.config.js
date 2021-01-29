const webpack = require('webpack')
const path = require('path')

const env = process.env.NODE_ENV

let entries = [ path.join(__dirname, 'src/index') ]
let output = {
  filename: 'bundle.js',
  path: path.join(__dirname, 'public')
}

const plugins = [
  new webpack.PrefetchPlugin('react'),
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(env) }
  })
]

let devtool = ''

if (env === 'dev') {
  entries = entries.concat([ 'webpack-dev-server/client?http://localhost:3001' ])
  output.path = __dirname
  devtool = 'eval'
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = {
  entry: entries,
  output: output,
  devtool: devtool,
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.css']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  plugins: plugins
}
