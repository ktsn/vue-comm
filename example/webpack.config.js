const path = require('path')

module.exports = {
  context: path.resolve(__dirname),
  entry: './main.ts',
  output: {
    path: path.resolve(__dirname),
    filename: '__build__.js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.json']
  },
  module: {
    rules: [
      { test: /\.ts/, loader: 'ts-loader' }
    ]
  },
  devtool: 'inline-source-map'
}