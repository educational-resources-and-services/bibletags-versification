var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/versification.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env'],
          plugins: [
            "@babel/plugin-proposal-object-rest-spread",
          ],
        },
      },
    ],
  },
  devtool: 'source-map',
  mode: 'development',
}