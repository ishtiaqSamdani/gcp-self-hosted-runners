const webpack = require('webpack');
const { plugins } = require('./webpack.common');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    port: 3001,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('development'),
    }),
    new Dotenv({
      path: './.env.dev',
    }),
  ],
};
