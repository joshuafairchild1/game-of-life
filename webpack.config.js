'use strict'

const path = require('path')
const webpack = require('webpack')
const bundlePath = path.resolve(__dirname, 'dist/')

module.exports = {
  entry: './src/index.tsx',
  output: {
    publicPath: bundlePath,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.scss$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  resolve: { extensions: [ '.js', '.ts', '.tsx', '.json' ] },
  devServer: {
    contentBase: path.join(__dirname,'public'),
    port: 3000,
    publicPath: 'http://localhost:3000/dist',
    historyApiFallback: true
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
}