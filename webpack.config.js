var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/versification.js',
  output: {
    path: path.resolve(__dirname, 'builds'),
    filename: 'index.js',
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
  mode: 'production',
}