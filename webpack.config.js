const path = require('path');
const WebpackManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  entry: './build/components/apps/ClientApp.js',
  output: {
    publicPath: '/static/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'client.[hash].js',
  },
  resolve: {
    extensions: ['.mjs', '.js'],
    modules: ['build', 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.m?js?$/,
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new WebpackManifestPlugin({
      fileName: '../build/manifest.json',
    }),
  ],
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
};
