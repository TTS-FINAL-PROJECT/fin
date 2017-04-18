'use strict'
const path = require('path')

module.exports = {
  context: path.resolve(__dirname, './app/index/src/js'),
  entry: {
    home: './main.js'
  },
  output: {
    path: path.resolve(__dirname, './public/index/js'),
    filename: '[name].bundle.js',
    publicPath: '/public/index/js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  externals: {
    socketIO: 'io'
  },
  watch: true
}
