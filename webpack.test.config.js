// Builds out the mocha tests

var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './tests/all.js',
  output: {
    path: path.resolve(__dirname, 'builds'),
    filename: 'tests.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env'],
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