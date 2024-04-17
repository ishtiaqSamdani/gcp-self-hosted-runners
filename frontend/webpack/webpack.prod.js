const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = () => {
  return merge(common, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
      minimizer: [new TerserPlugin()],
      splitChunks: {
        chunks: 'async',
        minSize: 20000,
        maxSize: 20000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        automaticNameDelimiter: '~',
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
        },
      },
      runtimeChunk: false,
    },
    module: {
      rules: [],
    },
    plugins: [
      new CleanWebpackPlugin({
        root: process.cwd(),
        verbose: true,
        dry: false,
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[fullhash:8].css',
        chunkFilename: '[id].[fullhash:8].css',
      }),
      new TerserPlugin(),
      new WebpackManifestPlugin(),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify({}),
      }),
      new CompressionPlugin(),
      new Dotenv({
        path: './.env.prod',
      }),
    ],
  });
};
