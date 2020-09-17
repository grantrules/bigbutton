const path = require('path');
const WebpackManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  entry: './build/components/apps/ClientApp.js',
  output: {
    publicPath: '/static/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'client.[hash].js',
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
  mode: 'development',
};
